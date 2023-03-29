export default async function send(req, res) {

    const nodemailer = require("nodemailer");

    // def de l'utilisateur qui envoie le mail ici avec google
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'milo.cartal.pro@gmail.com',
          pass: 'Legoland43&*'
        }
      });

    // on ecrit le message 
    let message = {
      from: 'milo.cartal.pro@gmail.com',
      to: 'chamets43@gmail.com',
      subject: 'je test si ça marche ça serais cool',
      text: 'genre vraiment'
    };

    // et on envoie
    transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('E-mail envoyé: ' + info.response);
      }
    });
    return res.status(error).json(info.response);
}