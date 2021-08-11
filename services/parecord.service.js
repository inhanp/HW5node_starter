const db = require('../_helpers/database');
const PArecord = db.PArecord;


module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord,
    editPArecord,
    averagePArecord
}


// write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.

async function getAllPArecords(username) {
    return await PArecord.find({createdBy: username});
}


async function addPArecord(parecord, username) {
    if (! await PArecord.findOne({ createdBy: username, createdDate: parecord.date  })) {
        let newrecord = parecord;
        parecord.createdBy = username;
        parecord.createdDate = parecord.date;
        parecord.activityType = parecord.type;
        dbrecord = new PArecord(newrecord);
        await dbrecord.save();
    }

}

async function deletePArecord(date, userId) {
    record = await PArecord.findOne({ createdDate: date });
    if (userId == record.createdBy) {
        record.remove();
        return 1;
    }
    else {
        return 0;
    }
}

async function editPArecord(parecord, username) {
    const record = await PArecord.findOne({ createdBy: username, createdDate: parecord.date  });
    await record.updateOne({calories: parecord.calories});
    await record.updateOne({minutes: parecord.minutes});
    await record.updateOne({activityType: parecord.type});
}

async function averagePArecord(username) {
    let user = await db.User.findOne({ username: username});
    let records = await PArecord.find({ createdBy: user.id});
    let average = {};
    let calories = 0;
    let minutes = 0;
    num = 0;
    records.forEach(record => {
        calories += record.calories;
        minutes += record.minutes;
        num++;
    })
    if (num !== 0) {
        average.avgcalories = Math.round(calories / num);
        average.avgminutes = Math.round(minutes / num);
    }
    else {
        average.avgcalories = 0;
        average.avgminutes = 0;
    }
    average.username = user.username;
    average.first = user.firstName;
    average.last = user.lastName;
    average.calgoal = user.caloriegoal;
    average.minutegoal = user.minutegoal;
    return average;
}
