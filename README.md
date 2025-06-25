# 📝 Online Student Registration

A simple full-stack web application project built using **Spring Boot (Java)** for the backend and **Next.js + Tailwind CSS + shadcn/ui** for the frontend. It allows new students to register and stores their data in a PostgreSQL database via Supabase.


## ✨ Features

- ✅ Student signup form with basic details
- 🔐 Secure backend with password hashing
- 🌐 RESTful API for communication between frontend & backend
- 💾 PostgreSQL database (via Supabase)
- 🎨 Clean and modern UI with Tailwind CSS & shadcn/ui
- 🔍 Form validation
- 📦 Modular and scalable project structure



## 🧱 Tech Stack

| Part       | Tech                             |
|------------|----------------------------------|
| Frontend   | Next.js, Tailwind CSS, shadcn/ui |
| Backend    | Spring Boot (Java 21)            |
| Database   | PostgreSQL via Supabase          |
| Auth       | Spring Security (optional)       |
| Build Tool | Gradle                           |

## 🚀 Getting Started

### 🖥️ Backend (Spring Boot)
1. Clone this repo and open in your IDE
2. Configure Supabase PostgreSQL details in `application.properties`:
    >```
    >spring.datasource.url=jdbc:postgresql://YOUR_URL
    >spring.datasource.username=YOUR_USERNAME
    >spring.datasource.password=YOUR_PASSWORD
    >```
3. Run the app: `./gradlew bootRun`


### 💻 Frontend (Next.js)
1. Navigate to frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## 📁 Folder Structure

/backend<br>
└── src/main/java/com/jayesh/...<br>
└── build.gradle

/frontend<br>
└── app/<br>
└── components/<br>
└── package.json<br>
└── tailwind.config.js


## 🙌 Acknowledgements

- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Spring Boot](https://spring.io/projects/spring-boot)


## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License.  
See the LICENSE file for details.
