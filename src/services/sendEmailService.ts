// import { getTokenAndTransport } from "../config/nodeMailer";

import { transporter } from "../config/nodeMailer";

export const sendEmail = async (email: string, code: string): Promise<void> => {
  /* const transporter  = await getTokenAndTransport();
  if(!transporter) throw new Error('no se pudo enviar email');
  console.log('lleque aqui'); */

  try {
    await transporter.sendMail({
      from: '"CODIGO de verificación" <not-reply@subetuarchivo.com>',
      to: email,
      subject: "Código de verificación para subier archivos",
      html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Tu código</a>
    </div>
    <p style="font-size:1.1em">Hola,</p>
    <p>Gracias por usar nuestro servicio. Utiliza este código para subir tu archivo. Este OTP es válido por 5 minutos</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
    <p style="font-size:0.9em;">Saludos,<br />Subetuarchivo</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Subetuarchivo Inc</p>
      <p>Namtrik</p>
      <p>Colombia</p>
    </div>
  </div>
</div>
      `,
    });
  } catch (error: any) {
    console.log("error: ", error.message);
    throw new Error(error.message);
  }
};
