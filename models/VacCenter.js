const sql = require('../config/vacCentersDB');

const VacCenter = function (vacCenter)
{
    this.id = vacCenter.id;
    this.name = vacCenter.name;
    this.tel = vacCenter.tel;
};

VacCenter.getAll = result => {
    sql.query("SELECT * FROM vacCenters", (error, response) => {
        if (error) {
            console.log("Error: ", error);
            result(null, error);
            return;
        }
        console.log("VacCenters: ", response);
        result(null, response);
    });
};

module.exports = VacCenter;