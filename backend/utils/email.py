import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to_email, subject, body):
    """
    Send an email using Python's built-in SMTP debug server.
    """
    print(f"Simulated sending email to {to_email} with subject '{subject}'")
    print("Email body:")
    print(body)
    return True

def send_password_reset_email(email, reset_token):
    """
    Simulate sending password reset email with token link
    """
    subject = "Reset Your IndieRadio Password"
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"
    
    body = f"""
    <html>
        <body>
            <h2>Reset Your Password</h2>
            <p>You have requested to reset your password for your IndieRadio account.</p>
            <p>Click the link below to set a new password:</p>
            <p><a href="{reset_link}">Reset Password</a></p>
            <p>If you did not request this password reset, please ignore this email.</p>
            <p>This link will expire in 1 hour for security purposes.</p>
            <br>
            <p>Best regards,</p>
            <p>The IndieRadio Team</p>
        </body>
    </html>
    """
    
    return send_email(email, subject, body)
