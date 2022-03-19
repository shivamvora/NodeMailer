const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const nodemailer = require( 'nodemailer' );
const cors = require( 'cors' );
const PORT = 3001;

const app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cors() );

app.get( '/', ( req, res ) => {
    res.json( { success: true, data: 'shivam vora' } )
} )

/**
 * This route is connected with frontend using proxy
 */
app.post( '/api/form', ( req, res ) => {
    let data = req.body;
    console.log( 'data is following', data );
    let smptpTransport = nodemailer.createTransport( {
        service: 'gmail',
        port: 465,
        auth: {
            user: '',
            pass: 'shivam2001@'
        }
    } );
    let mailOptions = {
        from: data.email,
        to: 'vorashivam0@gmail.com',
        subject: `Message from ${data.name}`,
        html: `
        
        <h3>Informations</h3>
            <ul>
            <li>Name: ${data.name}</li>
            <li>Last Name: ${data.lastname}</li>
            <li>Email: ${data.email}</li>
            </ul>

            <h3>Message</h3>
            <p>${data.message}</p>
        `
    };
    smptpTransport.sendMail( mailOptions, ( error, response ) => {
        console.log( 'error is following', error );
        console.log( 'Response', response );
        if ( error ) {
            response.send( error )
        } else {
            response.send( 'Success' )
        }
    } )

    smptpTransport.close();
} )

/**
 * This route used for testing in directly postman so that can predict in advnace
 */
app.post( '/shivam/demo', ( req, res ) => {
    var transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: 'your gmail',
            pass: 'your gmail password'
        }
    } );

    var mailOptions = {
        from: 'vorashivam6@gmail.com',
        to: 'gp853212@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail( mailOptions, function ( error, info ) {
        if ( error ) {
            console.log( 'Error is following', error );
        } else {
            console.log( 'Email sent: ' + info.response );
        }
    } );
} )

app.listen( PORT, () => {
    console.log( `server is running following url: http://localhost:${PORT}` );
} )