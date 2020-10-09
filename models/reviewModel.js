
const db = require("./conn")

class Review {
    constructor(score, content, winery_id, user_id){
        this.score = score,
        this.content = content,
        this.winery_id = winery_id,
        this.user_id = user_id
        }

    static async getAllReviews() {
        try {
            const response = await db.any(`SELECT * FROM reviews;`);
            console.log("response:", response)
            return response; 
        } catch(error){
            return error.message
        }
    }
    async addNewReview() {
        console.log("addnew user_id: ", this.user_id)

        try {
            const response = db.one(`INSERT INTO reviews (score, content, winery_id, user_id) 
                                            VALUES ($1, $2, $3, $4) 
                                            RETURNING id;`,
                                         [this.score, this.content, this.winery_id, this.user_id])
            //console.log("addResponse:", response)
            console.log("user id: ", user_id)
            return response;
        } catch(error){
            return error.message
        }
    }
    }



module.exports = Review;


