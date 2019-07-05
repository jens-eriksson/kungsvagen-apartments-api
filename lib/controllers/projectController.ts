import { Project } from '../models/project';
import { Unit } from '../models/unit';

export class ProjectController {

    public add(req, res) {
        if (req.user.role == "admin") {
            let project = new Project(req.body);
            project.save((err, project) => {
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
        Project.find({}).sort('-active').exec((err, projects) => {
            if (err) {
                res.send(err);
            }
            res.json(projects);
        });
    }

    public getByKey(req, res) {
        Project.findOne({ key: req.params.id }).lean().exec((err, project) => {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });
    }

    public getUnits(req, res) {
        Unit.find({ projectKey: req.params.id }, (err, units) => {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    }

    public update(req, res) {
        if (req.user.role == "admin") {
            Project.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, (err, project) => {
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

    public delete(req, res) {
        if (req.user.role == "admin") {
            Project.remove({ key: req.params.id }, (err, project) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted project!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }

    }

}