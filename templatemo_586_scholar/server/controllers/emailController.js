import { sendEmail } from '../services/mailService.js';

export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendEmail({
      to: 'ifrahranarauf@gmail.com',
      subject: `New Contact Message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
  }
};