# Presento
<hr>

Presento is a service that helps people to find the perfect gift for their loved ones. It has a variety of options 
for any age, gender, occasion and even budget. It’s a small service that can be improved and many other features can 
be added to it. Moreover, it can be added as a part of a big marketplace service. From the user's perspective, it’s 
an easy way to solve a very common but so complicated question: What gift should I bring? At the same time from the 
business perspective, it’s one more opportunity to advertise the product that you are selling.

![Demo1.png](readme_img%2FDemo1.png)
![Demo2.png](readme_img%2FDemo2.png)
![Demo3.png](readme_img%2FDemo3.png)
![Demo4.png](readme_img%2FDemo4.png)

## Check It

[Presento deployed on AWS](http://mate-presento.in.ua/)

## Features:
<hr>

- JWT authenticated:
- You can add more gifts through admin panel: /admin/
- Managing authentication & user registration
- Searching gifts using various filters: age, gender, occasion, budget, likes

## Run local with docker
<hr>

Docker should be installed

Open terminal and run:
  ```
  git clone https://github.com/Terrrya/Library-service.git
  cd Library-service
  ```

Create in root directory of project and fill .env file as shown in .env_sample file

  ```
  docker compose -f docker-compose-local.yml up
  ```
Open in browser: localhost/

## Filling .env file
<hr>

Don't forget to fill .env file as shown in .env_sample.

## Getting access
<hr>

You can use following:
- superuser:
  - Email: admin@admin.com
  - Password: test12345

Or create another one by yourself