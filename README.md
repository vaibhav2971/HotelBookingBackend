# Hotel Booking Portal (Backend)

## Group P007

This project was done under Dr.Puneet Gupta and in observation of Anup Kumar Gupta under Software engineering course lab (CS258).

Note: [Frontend Repository Link](https://github.com/lokeshkeelisetti/HotelBookingFrontend.git)

# 1. Install

First clone repo using the fallowing command

```bash
git clone https://github.com/lokeshkeelisetti/HotelBookingBackend.git
```

Navigate to the directory where you cloned

## Installing Dependencies

run the command in the project directory

```bash
npm install
```

To start the app in development mode run

```bash
nodemon server
```

Use [http://localhost:5000](http://localhost:5000) to fetch data from the database.

The page will reload if you make edits.  
You will also see any lint errors and warnings in the console.

# 2. Usage

1. Create .env file in the original directory
2. Add the following keys:  
   i. ATLAS_URI = URI generated while creating mongodb atlas cluster  
   ii. CUSTOMER_SECRET = Any random string  
   iii. HOTELADMIN_SECRET = Any random string  
   iv. MAINTAINER_SECRET = Any random string  
   v. RECEPTIONIST_SECRET = Any random string

# 3. Dependencies

1. Various Node modules by npm (can be found in package.json)
2. MongoDB atlas to host database
3. Heroku for free hosting (backend).
4. Netlify for free hosting (frontend).

# 4. Website Link

The Backend Section is hosted at [HotelPediaBackend](http://hotelbookingbackend.herokuapp.com/)

# 5. Documents

1. [Software Requirement Sheet](Software_Requirements_Specification.pdf)
2. [Design Document](Software_Design_Document.pdf)

# 6. Developers

This project is developed by

1. [Abhinav Reddy (190001007)](https://github.com/pixelbullet)
2. [keelisetti lokesh (190001022)](https://github.com/lokeshkeelisetti)
3. [Kushaan Gowda (190001031)](https://github.com/kushaangowda)
4. [Nunemunthala Shiva (190001041)](https://github.com/nunemunthalashiva)
5. [Rohit Banga (190001053)](https://github.com/RohitBanga3)
6. [Satya Bhagavan (190001055)](https://github.com/satyabhagavan)

# 7. Feedback and Suggestions

If you have any suggestions, or want to contribute:

1. Fork this repository
2. Update your project
3. Pull the repository's recent changes
4. Commit your changes
5. Create a pull request
6. If we have no issues with your code, it will be merged with the main repository
7. You can refer to this [link](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors) for more details
