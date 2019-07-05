import { Floorplan } from './../models/floorplan';

export class FloorplanController {

    public add(req, res) {
        if (req.user.role == "admin") {
            let floorplan = new Floorplan(req.body);

            floorplan.save((err, project) => {
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
        Floorplan.find({}, (err, floorplans) => {
            if (err) {
                res.send(err);
            }
            res.json(floorplans);
        });
    }

    public getByKey(req, res) {
        Floorplan.findOne({ key: req.params.id }, (err, floorplan) => {
            if (err) {
                res.send(err);
            }
            res.json(floorplan);
        });
    }

    public update(req, res) {
        if (req.user.role == "admin") {
            Floorplan.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, (err, floorplan) => {
                if (err) {
                    res.send(err);
                }
                res.json(floorplan);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    }

    public delete(req, res) {
        if (req.user.role == "admin") {
            Floorplan.remove({ key: req.params.id }, (err, floorplan) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted floorplan!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }

    }

}