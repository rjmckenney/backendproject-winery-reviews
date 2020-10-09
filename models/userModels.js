const db = require('./conn');
const bcrypt = require('bcryptjs');
class User {
    constructor(name, email, password, city, state, picture) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.city = city;
        this.state = state;
        this.picture =  picture;
    }
    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }
    async login(){
        try{
            const response = await db.one
            (`SELECT * FROM users WHERE email = $1;`,
            [this.email]
            );
            const isValid = this.checkPassword(response.password);
            if (!!isValid) {
                const {id, name } = response;
                return {isValid, id, name };
            } else {
                return{ isValid };
            }
        }catch(error) {
            return error.message;
        }
    
    }

    async save() {
        try{
            console.log('this is the save method', this.email); 
            const response = db.one(`INSERT INTO users (name, email, password, city, state) VALUES ($1,$2,$3,$4,$5) RETURNING id;`,
            [this.name, this.email, this.password, this.city, this.state]);
            //RETURNINGid add a row, auto increment
            return response
        }catch (error) {
            return error.message;
        }
    }

    static async getAll () {
        try{
            const response = await db.any(`SELECT * FROM winery_reviews;`);
            console.log('response', response);
            return response;
        } catch(error){
            return error.message;
        }
    }
}

module.exports = User;