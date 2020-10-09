const db = require('./conn');

class Winery {
    constructor( name, address, street, city, state, zip, primary_vine, picture) {
        this.name = name;
        this.address = address;
        this.street = street;
        this. city = city;
        this. state = state;
        this.zip = zip;
        this.primary_vine = primary_vine;
        this.picture = picture
    }
    static async getAll() {
        try {
            const response = await db.any(`SELECT * from wineries;`);
         //   console.log("response: ", response)
            return response;
        } catch(error){
            return error.message;
        }
    }
   static async getById(id){
        try {
            const response = await db.one(`SELECT * FROM wineries 
                                            WHERE id = $1; `, [id]);
            return response;
            }
        catch (err){
            return err.message;
            }
    }
    static async reviewsById(id){
        try {
            const response = await db.any(`SELECT reviews.score, reviews.content, users.name FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE reviews.winery_id = $1;`, [id]);
            console.log("response:", response)
       
            return response;
            }
        catch (err){
            return err.message;
            }
    }
    
    async addNewWinery() {
        try {
            const response = await db.result(`INSERT INTO wineries 
                                                (name, address, street, city, state, primary_vine, zip) 
                                                VALUES ($1, $2, $3, $4, $5, $7, $6);`, 
                                                [this.name, this.address, this.street,
                                                this.city, this.state, this.primary_vine, this.zip])
            console.log("addwinery:", response)
            return response;
        } catch(error){
            return error.message
        }
    }
}
module.exports = Winery;


