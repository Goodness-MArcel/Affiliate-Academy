import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, '../template/adminMail.html');
let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

console.log('Template path:', templatePath);

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASSWORD,
    },
});

// Function to replace template variables
const replaceTemplateVariables = (template, subject, message, name) => {
    return template
        .replace(/{{subject}}/g, subject)
        .replace(/{{message}}/g, message)
        .replace(/{{name}}/g, name || "User");
};

export const sendMail = async (req, res) => {
    const { to, subject, message, name } = req.body;
    
    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Missing email details' });
    }

    try {
        // Replace template variables
        const emailHtml = replaceTemplateVariables(htmlTemplate, subject, message, name);

        await transporter.sendMail({
            from: `"Affiliate Academy" <${process.env.GMAIL_USER}>`, // Fixed to use GMAIL_USER
            to,
            subject,
            html: emailHtml, // Use the template instead of hardcoded HTML
        });

        console.log(`📧 Email sent successfully to: ${to}`);
        console.log(`📋 Email details:`, {
            to,
            subject,
            name: name || 'Not specified',
            timestamp: new Date().toISOString()
        });
        
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('❌ Email sending error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

