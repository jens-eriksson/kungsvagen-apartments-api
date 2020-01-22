import { SalesAgent } from './../models/sales-agent';

export class SalesAgentController {

    public add(req, res) {
        if (req.user.role == "admin") {
            let salesAgent = new SalesAgent(req.body);

            salesAgent.save((err, project) => {
                if (err) {
                    res.send(err);
                }
                res.json(project);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public getAll(req, res) {
        SalesAgent.find({}).sort({'name' : 'asc'}).exec((err, salesAgents) => {
            if (err) {
                res.send(err);
            }
            res.json(salesAgents);
        });
    }

    public getByKey(req, res) {
        SalesAgent.findOne({ key: req.params.id }, (err, salesAgent) => {
            if (err) {
                res.send(err);
            }
            res.json(salesAgent);
        });
    }

    public update(req, res) {
        if (req.user.role == "admin") {
            SalesAgent.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, (err, salesAgent) => {
                if (err) {
                    res.send(err);
                }
                res.json(salesAgent);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public delete(req, res) {
        if (req.user.role == "admin") {
            SalesAgent.remove({ key: req.params.id }, (err, salesAgent) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted sales agent!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }

    }

}