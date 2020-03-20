# Goaly

Goaly is a simple yet powerful goal setting and tracking web application built with the MERN stack.

### [Live Preview](https://goaly.douara.me)

## Main Technologies and libraries

- MongoDB
- ExpressJS
- AdobeXD and [Pencil](https://pencil.evolus.vn/)
- React Hooks & Redux
- [MaterialUI](<[https://material-ui.com/](https://material-ui.com/)>)
- CSS in JS
- [Atomic design Methodology](<[https://atomicdesign.bradfrost.com/chapter-2/](https://atomicdesign.bradfrost.com/chapter-2/)>)
- Axios
- Google Auth API

## Prerequisites

- NodeJS environment

- Mongodb

**OR**

- Docker

- Docker Compose

## Getting Started

### In NodeJS Environemt

- Database

The easiest way to setup a MongoDB Database, is to use [MongoDB Atlas](<[https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)>), you need to get a [Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/) then paste it in the config json file `/server/config`

```
{
	"mongoURI": "{{Connection String here}}",

    "APPURL": "http://localhost:3000",

	"jwtSecret": "fa`W@3)Ka,X8>5Qa",

	"jwtSecretEmail": "u9@d)^6=fmGCr>[!",

	"jwtSecretPswd": "<N))]/)3CV_Gw}:x"
}
```

a detailed tutorial for Atlas could be found [here](<[https://docs.atlas.mongodb.com/getting-started/](https://docs.atlas.mongodb.com/getting-started/)>)

#### Installing Packages

- **Front-end**
  From the terminal, cd into the folder: `client` and run `npm install`

- **Backend**
  From the terminal, cd into the folder: `server` and run `npm install`

Now you can start the project by running the command: `npm run dev`
From inside the `server` folder.

### Using Docker

- First you need to install Docker, download the installer package from the official website [here](<[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)>)

- from the root directory, run the command:

```

docker-compose up -d

```

By the end of the processes, the application will be running on the port: http://localhost:3000

## Sending Emails

The application is using Gmail API to send emails (Activation and password reset emails) , you need to add your own credentials to the file: `/server/config/google-smtp.json`

```
{
	"clientId": "",

	"clientSecret": "",

	"refreshToken": ""
}
```

The way to get those credentials is well explained in [this tutorial](https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799)

## License

This project is licensed under the [GPL2 License](https://github.com/DOUARA/goaly/blob/master/Licence)
