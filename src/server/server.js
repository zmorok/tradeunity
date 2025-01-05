const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)

app.use(express.json())

const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function sendEmail(email, subject, message, html) {
	try {
		const accessToken = await oAuth2Client.getAccessToken()

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'core.such.react@gmail.com',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken.token,
			},
		})

		const mailOptions = {
			from: 'core.such.react@gmail.com',
			to: email,
			subject: subject,
			text: message,
			html: html,
		}

		const result = await transporter.sendMail(mailOptions)
		return result
	} catch (error) {
		console.error('Error sending email:', error.message)
		throw new Error('Failed to send email')
	}
}

app.post('/send-email', async (req, res, next) => {
	const { email, subject, message, html } = req.body

	if (!email || !subject || (!message && !html)) {
		return res
			.status(400)
			.json({ message: 'Все поля обязательны для заполнения!' })
	}

	try {
		await sendEmail(email, subject, message, html)
		res.status(200).json({ message: 'Письмо успешно отправлено!' })
	} catch (error) {
		next(error)
	}
})

app.use((err, res) => {
	console.error('Unhandled error:', err.message)
	res.status(500).json({
		message: 'Внутренняя ошибка сервера. Попробуйте позже!',
		error: process.env.NODE_ENV === 'development' ? err.message : undefined,
	})
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
