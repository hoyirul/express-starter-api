const { QueryTypes } = require('sequelize');
const connect = require('./../../config/connection');

const index = async (req, res) => {
    try{
        const response = [];
        // energies
        const sql = "select date_format(description, '%m-%Y') as month, pln, solar from energy_monthly";
        const energy = await connect.energyDB.query(sql, { type: QueryTypes.SELECT });
        // utils
        const util = await connect.utilDB.query("select date_format(month, '%m-%Y') as month, " + 
        "filled_bottle_350 from filled_bottle", 
        { type: QueryTypes.SELECT });

        energy.forEach(async element => {
            util.forEach(rows => {
                if(rows.month === element.month){
                    response.push({
                        pln: element.pln,
                        filled: rows.filled_bottle_350,
                        month: rows.month,
                        devide: element.pln / rows.filled_bottle_350
                    });
                }
            });
        });
        return res.status(200).json(response);
    }catch(error){
        res.status(500).json(error.message);
    }
}

const store = async (req, res) => {
    try{
        // your function
    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}

const show = async (req, res) => {
    
}

const update = async (req, res) => {
    
}

const destroy = async (req, res) => {

}

module.exports = {
    index, store, show, update, destroy
}