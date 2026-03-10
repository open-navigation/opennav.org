/**
 * Google Apps Script for handling contact form submissions
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a new Google Sheet
 *    - Go to https://sheets.google.com
 *    - Create a new spreadsheet
 *    - Add headers in row 1: Timestamp | Name | Email | Subject | Message | Interests
 *
 * 2. Open Script Editor
 *    - In your Google Sheet, go to Extensions > Apps Script
 *    - Delete any existing code and paste this entire script
 *
 * 3. Configure Settings
 *    - Update SPREADSHEET_ID with your sheet's ID (from the URL)
 *    - Update NOTIFICATION_EMAIL with your email address
 *
 * 4. Deploy as Web App
 *    - Click Deploy > New deployment
 *    - Select "Web app" as the type
 *    - Set "Execute as" to "Me"
 *    - Set "Who has access" to "Anyone"
 *    - Click Deploy and copy the Web App URL
 *
 * 5. Update Contact Form
 *    - In src/components/ContactForm.astro, replace 'YOUR_GOOGLE_APPS_SCRIPT_URL'
 *      with your deployed Web App URL
 */

// ============ CONFIGURATION ============

// Your Google Sheet ID (from the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit)
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// Email address to receive notifications
const NOTIFICATION_EMAIL = 'info@opennav.org';

// Sheet name (default is 'Sheet1')
const SHEET_NAME = 'Sheet1';

// ============ MAIN FUNCTION ============

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Add row to spreadsheet
    addToSheet(data);

    // Send email notification
    sendNotification(data);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Form submitted successfully' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error and return error response
    console.error('Error processing form:', error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'OK',
      message: 'Open Navigation Contact Form API is running'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============ HELPER FUNCTIONS ============

function addToSheet(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  // Append row with form data
  sheet.appendRow([
    new Date().toISOString(),  // Timestamp
    data.name || '',           // Name
    data.email || '',          // Email
    data.subject || '',        // Subject
    data.message || '',        // Message
    data.interests || ''       // Interests
  ]);
}

function sendNotification(data) {
  const subject = `New Contact Form: ${data.subject || 'No Subject'}`;

  const body = `
New contact form submission from opennav.org

----------------------------------------
Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Subject: ${data.subject || 'Not provided'}
Interests: ${data.interests || 'Not specified'}
----------------------------------------

Message:
${data.message || 'No message provided'}

----------------------------------------
Submitted: ${new Date().toLocaleString()}
  `.trim();

  // Send email notification
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
    replyTo: data.email || NOTIFICATION_EMAIL
  });
}

// ============ TEST FUNCTION ============

// Run this function to test the setup
function testSetup() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Submission',
    message: 'This is a test message.',
    interests: 'Consulting'
  };

  // Test adding to sheet
  try {
    addToSheet(testData);
    console.log('✓ Successfully added row to sheet');
  } catch (error) {
    console.error('✗ Failed to add row:', error);
  }

  // Note: Email sending may fail in test mode due to quotas
  console.log('Test complete! Check your spreadsheet for the test entry.');
}
