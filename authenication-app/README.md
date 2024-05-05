# Folder structure 
- Everything inside src/ 
- Backend(src/app/api/)(eg: home/route.js/ts)
 and Frontend(eg: login/page.tsx/jsx) inside src/app/
- middlewares/ , models/ , helpers/ ,dbConfig/ could be in the hierarchy of app/

- we dont need express for backend

# packages using 
axios nodemailer bcrypt jsonwebtoken react-hot-toast mongoose

# env
MONGO_URI=
SECRET_TOKEN=
DOMAIN=


# Models 
- Creation is same but exporting has special syntax , if already created use it or create (const User = mongoose.models.users || ... ; export default User;)