const { models } = require("mongoose")

function approved(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <title>Listing Approved</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    
            body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                background-color: #fff;
                color: #000;
                padding: 30px 0;
                text-align: center;
            }
    
            .header h1 {
                margin: 0;
                font-weight: 700;
            }
    
            .content {
                padding: 30px;
            }
    
            .content p {
                margin: 0 0 20px;
            }
    
            .footer {
                background-color: #f27121d1;
                color: #fff;
                text-align: center;
                padding: 20px;
                font-size: smaller;
            }
    
            .footer a {
                color: #fff;
            }
            .footer p {
                margin: 0;
            }
    
            .social-icons,
            .app-icons {
                text-align: center;
                margin-top: 20px;
            }
    
            .social-icons a,
            .app-icons a {
                display: inline-block;
                margin: 0 10px;
                color: #000;
            }
    
            .logo {
                text-align: center;
                padding: 20px;
            }
    
            .logo img {
                max-width: 200px;
                height: auto;
            }
        </style>
    </head>
    
    <body>
    
        <table class="container" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
            <tr>
                <td class="logo">
                    <a href="https://akerayu.com/" target="_blank"><img src="https://akerayu.com/emailImages/logo.png" alt=""></a>
                </td>
            </tr>
            <tr>
                <td class="header">
                    <h1>Congratulations! Your listing has been approved!</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <p>We're thrilled to announce that your listing has been approved and is now visible to potential renters/buyers on our platform.</p>
                    <p>Your listing details:</p>
                    <ul>
                        <li><strong>Title:</strong> ${data.title}</li>
                        <li><strong>Description:</strong> ${data.description}</li>
                        <!-- You can include more listing details here if needed -->
                    </ul>
                    <p>Your listing is now live and visible to users. Feel free to manage your listing and respond to inquiries. Here's what you can do next:</p>
                    <ul>
                        <li>Share your listing with friends and family on social media.</li>
                        <li>Respond promptly to any inquiries you receive.</li>
                        <li>Keep your listing information up-to-date.</li>
                        <li>View your listing</li>
                    </ul>
                    <div style="text-align: center; padding-bottom: 1em;">
                        <button
                            style="background-color: #f27121d1; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">
                            <a href="https://akerayu.com/detail/${data.locationName.split(' ').join(' ').replace(/%20/g, " ").replace(/,/g, "").replace(/ /g, "-") + "/" + data._id}" target="_blank" style="text-decoration: none; color: #ffffff;">View Listing</a>
                        </button>
                    </div>
                    <p>If you have any questions or need further assistance, feel free to reach out to us. <a
                        href="https://akerayu.com/contact" target="_blank"
                        style="font-weight: 700; color: #000;">Contact Akerayu Support</a></p>
                    <div class="app-icons">
                        <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/android.png" alt="Get it on Google Play"></a>
                        <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/ios.png" alt="Download on the App Store"></a>
                    </div>
                    <div class="social-icons">
                        <a href="https://www.facebook.com/akerayuofficial/" target="_blank"><i class="fa-brands fa-facebook fa-xl"></i></a>
                        <a href="https://www.instagram.com/akerayu" target="_blank"><i class="fa-brands fa-instagram fa-xl"></i></a>
                        <a href="https://www.tiktok.com/@akerayuofficial" target="_blank"><i class="fa-brands fa-tiktok fa-xl"></i></a>
                        <a href="https://t.me/akerayu" target="_blank"><i class="fa-brands fa-telegram fa-xl"></i></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>NOTE: This is an automatically generated email, please do not reply.</p>
                    <p>By using our services, you agree to the <a href="https://akerayu.com/terms-of-use" target="_blank"><b><u>Terms of Use </u></b></a> and <a href="https://akerayu.com/privacy-policy" target="_blank"><b><u>Privacy policy</u></b></a>.</p>
                    <p>&copy; 2024 All rights reserved.</p>
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>
    `
}
function pending() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <title>Listing Under Review</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    
            body {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                background-color: #fff;
                color: #000;
                padding: 30px 0;
                text-align: center;
            }
    
            .header h1 {
                margin: 0;
                font-weight: 700;
            }
    
            .content {
                padding: 30px;
            }
    
            .content p {
                margin: 0 0 20px;
            }
    
            .footer {
                background-color: #f27121d1;
                color: #fff;
                text-align: center;
                padding: 20px;
                font-size: smaller;
            }
    
            .footer a {
                color: #fff;
            }
            .footer p {
                margin: 0;
            }
    
            .social-icons,
            .app-icons {
                text-align: center;
                margin-top: 20px;
            }
    
            .social-icons a,
            .app-icons a {
                display: inline-block;
                margin: 0 10px;
                color: #000;
            }
    
            .logo {
                text-align: center;
                padding: 20px;
            }
    
            .logo img {
                max-width: 200px;
                height: auto;
            }
        </style>
    </head>
    
    <body>
    
        <table class="container" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
            <tr>
                <td class="logo">
                    <a href="https://akerayu.com/" target="_blank"><img src="https://akerayu.com/emailImages/logo.png" alt=""></a>
                </td>
            </tr>
            <tr>
                <td class="header">
                    <h1>Your listing is under review</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <p>We have received your listing submission and it is currently under review by our team. We typically review listings within one business day.</p>
                    <p>Review our listing guidelines <a href="https://akerayu.com/listing-guidelines">here</a> to ensure your listing complies with our standards. This will help expedite the approval process.</p>
                    <p>Rest assured, we will notify you via email once the review process is complete.</p>
                    <p>In the meantime, feel free to explore our website and familiarize yourself with our services.</p>
                    <div style="text-align: center; padding-bottom: 1em;">
                        <button
                            style="background-color: #f27121d1; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">
                            <a href="https://akerayu.com/" target="_blank" style="text-decoration: none; color: #ffffff;">Explore Now</a>
                        </button>
                    </div>
                    <p>If you have any questions about the review process, please don't hesitate to contact us <a
                        href="https://akerayu.com/contact" target="_blank"
                        style="font-weight: 700; color: #000;">Contact Akerayu Support</a></p>
                        <p>Thank you for your patience!</p>
                    <div class="app-icons">
                        <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/android.png" alt="Get it on Google Play"></a>
                        <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/ios.png" alt="Download on the App Store"></a>
                    </div>
                    <div class="social-icons">
                        <a href="https://www.facebook.com/akerayuofficial/" target="_blank"><i class="fa-brands fa-facebook fa-xl"></i></a>
                        <a href="https://www.instagram.com/akerayu" target="_blank"><i class="fa-brands fa-instagram fa-xl"></i></a>
                        <a href="https://www.tiktok.com/@akerayuofficial" target="_blank"><i class="fa-brands fa-tiktok fa-xl"></i></a>
                        <a href="https://t.me/akerayu" target="_blank"><i class="fa-brands fa-telegram fa-xl"></i></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>NOTE: This is an automatically generated email, please do not reply.</p>
                    <p>By using our services, you agree to the <a href="https://akerayu.com/TermsOfService" target="_blank"><b><u>Terms of Use </u></b></a> and <a href="https://akerayu.com/PrivacyPolicy" target="_blank"><b><u>Privacy policy</u></b></a>.</p>
                    <p>&copy; 2024 All rights reserved.</p>
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>
    
    `
}

function rejected(data) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <title>Listing Rejected</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #fff;
            color: #000;
            padding: 30px 0;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-weight: 700;
        }

        .content {
            padding: 30px;
        }

        .content p {
            margin: 0 0 20px;
        }

        .footer {
            background-color: #f27121d1;
            color: #fff;
            text-align: center;
            padding: 20px;
            font-size: smaller;
        }

        .footer a {
            color: #fff;
        }
        .footer p {
            margin: 0;
        }

        .social-icons,
        .app-icons {
            text-align: center;
            margin-top: 20px;
        }

        .social-icons a,
        .app-icons a {
            display: inline-block;
            margin: 0 10px;
            color: #000;
        }

        .logo {
            text-align: center;
            padding: 20px;
        }

        .logo img {
            max-width: 200px;
            height: auto;
        }
    </style>
</head>

<body>

    <table class="container" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
        <tr>
            <td class="logo">
                <a href="https://akerayu.com/" target="_blank"><img src="https://akerayu.com/emailImages/logo.png" alt=""></a>
            </td>
        </tr>
        <tr>
            <td class="header">
                <h1>We regret to inform you that your listing has been rejected</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Thank you for submitting your listing for ${data.title}. We appreciate you choosing our platform.</p>
                <p>After careful review, we regret to inform you that your listing was not approved at this time. Here are some reasons why your listing might have been rejected:</p>
                <ul>
                    <li>Missing or incomplete information.</li>
                    <li>Photos that are blurry, low-quality, or not representative of the property.</li>
                    <li>Content that violates our <a href="https://akerayu.com/listing-guidelines">listing guidelines</a>.</li>
                    <li>Duplicate listing.</li>
                    <!-- You can include more reasons here if needed -->
                </ul>
                <p>We recommend reviewing your listing and making any necessary edits to comply with our guidelines. You can then resubmit your listing for review.</p>
                <p>Here are some resources that may be helpful:</p>
                
                <ul>
                <li><a href="https://akerayu.com/listing-guidelines">Listing Guidelines</a></li>
                <li>If you have any further questions, require assistance or if you think this is a mistake, please don't hesitate to contact us. <a
                    href="https://akerayu.com/contact" target="_blank"
                    style="font-weight: 700; color: #000;">Contact Akerayu Support</a></li>
                </ul>

                <div class="app-icons">
                    <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/android.png" alt="Get it on Google Play"></a>
                    <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/ios.png" alt="Download on the App Store"></a>
                </div>
                <div class="social-icons">
                    <a href="https://www.facebook.com/akerayuofficial/" target="_blank"><i class="fa-brands fa-facebook fa-xl"></i></a>
                    <a href="https://www.instagram.com/akerayu" target="_blank"><i class="fa-brands fa-instagram fa-xl"></i></a>
                    <a href="https://www.tiktok.com/@akerayuofficial" target="_blank"><i class="fa-brands fa-tiktok fa-xl"></i></a>
                    <a href="https://t.me/akerayu" target="_blank"><i class="fa-brands fa-telegram fa-xl"></i></a>
                </div>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <p>NOTE: This is an automatically generated email, please do not reply.</p>
                <p>By using our services, you agree to the <a href="https://akerayu.com/TermsOfService" target="_blank"><b><u>Terms of Use </u></b></a> and <a href="https://akerayu.com/PrivacyPolicy" target="_blank"><b><u>Privacy policy</u></b></a>.</p>
                <p>&copy; 2024 All rights reserved.</p>
            </td>
        </tr>
    </table>

</body>

</html>

    
    `
}
function welcome() {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <title>Registration Confirmation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #fff;
            color: #000;
            padding: 30px 0;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-weight: 700;
        }

        .content {
            padding: 30px;
        }

        .content p {
            margin: 0 0 20px;
        }

        .content ul {
            margin: 0;
            padding-left: 20px;
        }

        .content li {
            margin-bottom: 10px;
        }

        .footer {
            background-color: #f27121d1;
            color: #fff;
            text-align: center;
            padding: 20px;
            font-size: smaller;
        }

        .footer a {
            color: #fff;
        }
        .footer p {
            margin: 0;
        }

        .social-icons,
        .app-icons {
            text-align: center;
            margin-top: 20px;
        }

        .social-icons a,
        .app-icons a {
            display: inline-block;
            margin: 0 10px;
            color: #000;
        }

        .logo {
            text-align: center;
            padding: 20px;
        }

        .logo img {
            max-width: 200px;
            height: auto;
        }
    </style>
</head>

<body>

    <table class="container" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
        <tr>
            <td class="logo">
                <a href="https://akerayu.com/" target="_blank"><img src="https://akerayu.com/emailImages/logo.png" alt=""></a>
            </td>
        </tr>
        <tr>
            <td class="header">
                <h1>Thanks for creating an account at Akerayu, and welcome!
                </h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Feel free to explore our website and enjoy our services.</p>
                <div style="text-align: center; padding-bottom: 1em;">
                    <button
                        style="background-color: #f27121d1; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">
                        <a href="https://akerayu.com/" target="_blank" style="text-decoration: none; color: #ffffff;">Explore Now</a>
                    </button>
                </div>
                <p>Should you have any questions or need assistance, don't hesitate to contact us. <a
                        href="https://akerayu.com/contact" target="_blank"
                        style="font-weight: 700; color: #000;">Contact Akerayu Support</a></p>
                <div class="app-icons">
                    <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/android.png" alt="Get it on Google Play"></a>
                    <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/ios.png" alt="Download on the App Store"></a>
                </div>
                <div class="social-icons">
                    <a href="https://www.facebook.com/akerayuofficial/" target="_blank"><i class="fa-brands fa-facebook fa-xl"></i></a>
                    <a href="https://www.instagram.com/akerayu" target="_blank"><i class="fa-brands fa-instagram fa-xl"></i></a>
                    <a href="https://www.tiktok.com/@akerayuofficial" target="_blank"><i class="fa-brands fa-tiktok fa-xl"></i></a>
                    <a href="https://t.me/akerayu" target="_blank"><i class="fa-brands fa-telegram fa-xl"></i></a>
                </div>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <p>NOTE: This is an automatically generated email, please do not reply.</p>
                <p>By signing up, you agree to the <a href="https://akerayu.com/TermsOfService" target="_blank"><b><u>Terms of Use </u></b></a> and <a href="https://akerayu.com/PrivacyPolicy" target="_blank"><b><u>Privacy policy</u></b></a>.</p>
                <p>&copy; 2024 All rights reserved.</p>
            </td>
        </tr>
    </table>

</body>

</html>
`
}
function admin(data) {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <title>Registration Confirmation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #fff;
            color: #000;
            padding: 30px 0;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-weight: 700;
        }

        .content {
            padding: 30px;
        }

        .content p {
            margin: 0 0 20px;
        }

        .content ul {
            margin: 0;
            padding-left: 20px;
        }

        .content li {
            margin-bottom: 10px;
        }

        .footer {
            background-color: #f27121d1;
            color: #fff;
            text-align: center;
            padding: 20px;
            font-size: smaller;
        }

        .footer a {
            color: #fff;
        }
        .footer p {
            margin: 0;
        }

        .social-icons,
        .app-icons {
            text-align: center;
            margin-top: 20px;
        }

        .social-icons a,
        .app-icons a {
            display: inline-block;
            margin: 0 10px;
            color: #000;
        }

        .logo {
            text-align: center;
            padding: 20px;
        }

        .logo img {
            max-width: 200px;
            height: auto;
        }
    </style>
</head>

<body>

    <table class="container" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
        <tr>
            <td class="logo">
                <a href="https://akerayu.com/" target="_blank"><img src="https://akerayu.com/emailImages/logo.png" alt=""></a>
            </td>
        </tr>
        <tr>
            <td class="header">
                <h1>New Listing
                </h1>
                <h6>Id --- ${data._id}</h6>
                <h6>LocationName----- ${data.locationName}</h6>
                <h6>Title---- ${data.title}</h6>
                <h6>description --- ${data.description}</h6>
                <h6>PropertyFor----- ${data.propertyFor}</h6>
                <h6>Bed Room---- ${data.bedRoom}</h6>
                <h6>BathRoom----- ${data.bathRoom}</h6>
            </td>
        </tr>
        <tr>
            <td class="content">
                <p>Feel free to explore our website and enjoy our services.</p>
                <div style="text-align: center; padding-bottom: 1em;">
                    <button
                        style="background-color: #f27121d1; color: #ffffff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">
                        <a href="https://akerayu.com/" target="_blank" style="text-decoration: none; color: #ffffff;">Explore Now</a>
                    </button>
                </div>
                <p>Should you have any questions or need assistance, don't hesitate to contact us. <a
                        href="https://akerayu.com/contact" target="_blank"
                        style="font-weight: 700; color: #000;">Contact Akerayu Support</a></p>
                <div class="app-icons">
                    <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/android.png" alt="Get it on Google Play"></a>
                    <a href="#" target="_blank"><img src="https://akerayu.com/emailImages/ios.png" alt="Download on the App Store"></a>
                </div>
                <div class="social-icons">
                    <a href="https://www.facebook.com/akerayuofficial/" target="_blank"><i class="fa-brands fa-facebook fa-xl"></i></a>
                    <a href="https://www.instagram.com/akerayu" target="_blank"><i class="fa-brands fa-instagram fa-xl"></i></a>
                    <a href="https://www.tiktok.com/@akerayuofficial" target="_blank"><i class="fa-brands fa-tiktok fa-xl"></i></a>
                    <a href="https://t.me/akerayu" target="_blank"><i class="fa-brands fa-telegram fa-xl"></i></a>
                </div>
            </td>
        </tr>
        <tr>
            <td class="footer">
                <p>NOTE: This is an automatically generated email, please do not reply.</p>
                <p>By signing up, you agree to the <a href="https://akerayu.com/TermsOfService" target="_blank"><b><u>Terms of Use </u></b></a> and <a href="https://akerayu.com/PrivacyPolicy" target="_blank"><b><u>Privacy policy</u></b></a>.</p>
                <p>&copy; 2024 All rights reserved.</p>
            </td>
        </tr>
    </table>

</body>

</html>
`
}

module.exports = {
    approved,
    pending,
    rejected,
    welcome,
    admin
}