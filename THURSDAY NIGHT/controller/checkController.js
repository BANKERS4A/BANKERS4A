
const model = require('../models/chequeModel')
const joi = require('joi')








exports.create = (req, res) => {
    let body = req.body
   
    const schema = {
        chequeNo: joi.string().required(),
        Amount: joi.number().required(),
        account: joi.string().required(),
        AccountNumber: joi.string().required(),
        username:joi.string().required()
        
    };
   
    
    const { error } = joi.validate(body, schema);
    if (error) {
        res.status(400)
        res.send(error)

    }
    else {
       
        model.insertData(body)
            .then((response) => {
                res.status(200);
                res.send(response)
            })
        
            .catch((err) => {
                res.status(500);
                res.send(err)
            })
    }
}


















exports.chequeOne = (req, res) => {
    let query = req.query
    const schema = {
        // AccountNumber: joi.string(),
        state: joi.string(),
        // chequeNo: joi.string(),
        // Amount: joi.string(),
        // account: joi.string(),
        
        
    };
    const { error } = joi.validate(query, schema);
    if (error) {
        res.status(400)
        res.send(error)

    }
    else {
        model.findcheque(req.query)
            .then((result) => {
                res.status(200)
                res.send(result)
            })
            .catch((e) => {
                res.send(e)
            })
    }
}






exports.update = (req, res) => {
    const paramsSchema = {
        AccountNumber: joi.string().required(),
    }
    const { error } = joi.validate(req.params, paramsSchema);
    if (error) {
        res.status(400)
        res.send(error)
    } else {
        let body = req.body
        const schema = {
            chequeNo: joi.string(),
            Amount: joi.number(),
            account: joi.string(),
            AccountNumber: joi.string(),
            username:joi.string()
           
          
        };
        const { error } = joi.validate(body, schema);
        if (error) {
            res.status(400)
            res.send(error)
        }
        else {
            model.updateData(req.params ,req.body)
                .then((response) => {
                    res.status(200);
                    res.send(response)
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err)
                })
        }
    }
}















exports.stateClear = (req, res) => {
    const paramsSchema = {
        AccountNumber: joi.string().required(),
    }
    const { error } = joi.validate(req.params, paramsSchema);
    if (error) {
        res.status(400)
        res.send(error)
    } else {
        let body = req.body
        const schema = {
            chequeNo: joi.string(),
            Amount: joi.number(),
            account: joi.string(),
            AccountNumber: joi.string(),
            username:joi.string()
           
          
        };
        const { error } = joi.validate(body, schema);
        if (error) {
            res.status(400)
            res.send(error)
        }
        else {
            model.clearence(req.params ,req.body)
                .then((response) => {
                    res.status(200);
                    res.send(response)
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err)
                })
        }
    }
}





exports.cleared = (req, res) => {
    const paramsSchema = {
        AccountNumber: joi.string().required(),
    }
    const { error } = joi.validate(req.params, paramsSchema);
    if (error) {
        res.status(400)
        res.send(error)
    } else {
        let body = req.body
        const schema = {
            chequeNo: joi.string(),
            Amount: joi.number(),
            account: joi.string(),
            AccountNumber: joi.string(),
            username:joi.string()
           
          
        };
        const { error } = joi.validate(body, schema);
        if (error) {
            res.status(400)
            res.send(error)
        }
        else {
            model.clear(req.params ,req.body)
                .then((response) => {
                    res.status(200);
                    res.send(response)
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err)
                })
        }
    }
}


exports.bounced = (req, res) => {
    const paramsSchema = {
        AccountNumber: joi.string().required(),
    }
    const { error } = joi.validate(req.params, paramsSchema);
    if (error) {
        res.status(400)
        res.send(error)
    } else {
        let body = req.body
        const schema = {
            chequeNo: joi.string(),
            Amount: joi.number(),
            account: joi.string(),
            AccountNumber: joi.string(),
            username:joi.string()
           
          
        };
        const { error } = joi.validate(body, schema);
        if (error) {
            res.status(400)
            res.send(error)
        }
        else {
            model.bounce(req.params ,req.body)
                .then((response) => {
                    res.status(200);
                    res.send(response)
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err)
                })
        }
    }
}