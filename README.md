### Project Description
ARTwrks is a web app where users can create art on a digital canvas (with a transparent or white background) using drawing/painting tools, geometric shapes, and  features such as opacity and resizing. The canvas can be saved to the user profile among multiple portfolios, for retrieving by title search, by portfolio, or all at once.  Both portfolios and artworks have an update-details feature.

***

### Contents
* [Tech Stack](#tech-stack) <br/>
* [Installation](#installation) <br/>
* [Features](#features) <br/>

***

### Tech Stack
Backend: Python, Flask, Postgresql, SQLAlchemy 
Frontend: Javascript, jQuery, AJAX, HTML5, Jinja2, Bootstrap, CSS 
APIs: Fabric.js, Amazon S3

***

### Installation
Install PostgreSQL 

Clone or fork this repo:

```https://github.com/j-zarr/hb-capstone.git```


Create a virtual environment and activate it:
```
virtualenv env
source env/bin/activate
```

Install  the project requirements:
```
pip3 install -r requirements.txt 
```

Before running the  file, you will need an AWS S3 bucket set to public, and an IAM user. 

Create a <kbd>secret.sh</kbd> file to store your IAM user access key ID and secret access keys: <br/>
(Make sure to add secrets.sh to your <kbd>.gitignore</kbd> file.)
```
export S3_KEY_ID='your_access_key_ID'
export S3_SECRET_KEY='your_secret_access_key'
```



In <kbd>server.py</kbd>, replace the name of the S3 bucket with your S3 bucket name, on lines 30 and 36.

Seed the postgresql database:
```
python3 seed.py 
```

Now you are ready to run the file:
```
source secrets.sh
python3 server.py
```

You can now navigate to 'localhost:5000' to access ARTwrks

***

### Features
User can login to their profile or register:
![alt text](https://github-my-images.s3.amazonaws.com/ARTwrks-login-register.png  "Login Form")
<br/>

Users can choose a transparent or white canvas:
![alt text](https://github-my-images.s3.amazonaws.com/ARTwrks-canvas-bg.png "Canvas Background Color")
<br/>

Users can choose the color, opacity, and line width:
![alt text](https://github-my-images.s3.amazonaws.com/ARTwrks-color-options.png "Color Options")
<br/>

Users can view their saved artworks and update the details:
![alt text](https://github-my-images.s3.amazonaws.com/artworks-card.png "Artwork Cards")
<br/>

Users can view their portfolios and update the details:
![alt text](https://github-my-images.s3.amazonaws.com/portfolio-cards.png "Portfolio Cards")
<br/>
