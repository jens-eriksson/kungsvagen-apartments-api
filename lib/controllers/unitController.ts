import { Unit } from '../models/unit';

export class UnitController {

    public add(req, res) {
        if (req.user.role == "admin") {
            let unit = new Unit(req.body);

            unit.save((err, unit) => {
                if (err) {
                    res.send(err);
                }
                res.json(unit);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public getAll(req, res) {
        let query = Unit.find({}).select("-documents");
        if(req.user && req.user.role == "admin") {
            query = Unit.find({});
        }
        
        query.exec((err, units) => {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    }

    public getByKey(req, res) {
        let query = Unit.findOne({ key: req.params.id }).select("-documents");
        if(req.user && req.user.role == "admin") {
            query = Unit.findOne({ key: req.params.id });
        }

        query.exec((err, units) => {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    }

    public update(req, res) {
        if (req.user.role == "admin") {
            Unit.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, (err, unit) => {
                if (err) {
                    res.send(err);
                }
                res.json(unit);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public delete(req, res) {
        if (req.user.role == "admin") {
            Unit.remove({ key: req.params.id }, (err, unit) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted unit!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }

    }

}