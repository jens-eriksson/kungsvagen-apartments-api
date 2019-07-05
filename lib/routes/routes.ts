import { SalesAgentController } from './../controllers/salesAgentController';
import { FloorplanController } from './../controllers/floorplanController';
import { ProjectController } from "../controllers/projectController";
import { UnitController } from './../controllers/unitController';
import { AuthController } from './../controllers/authController';
import * as jwt from 'express-jwt';

export class Routes { 
    
    public projectController: ProjectController = new ProjectController();
    public unitController: UnitController = new UnitController();
    public floorplanController: FloorplanController = new FloorplanController();
    public salesAgentController: SalesAgentController = new SalesAgentController();
    public authController: AuthController = new AuthController();

    public setup(app): void {
        // /project
        app.route('/projects')
        .get(jwt({secret: app.get("jwtSecret")}), this.projectController.getAll)   
        .post(jwt({secret: app.get("jwtSecret")}), this.projectController.add);

        app.route('/projects/:id')
        .get(jwt({secret: app.get("jwtSecret")}), this.projectController.getByKey)
        .put(jwt({secret: app.get("jwtSecret")}), this.projectController.update)
        .delete(jwt({secret: app.get("jwtSecret")}), this.projectController.delete)

        app.route('/projects/:id/units')
        .get(jwt({secret: app.get("jwtSecret")}), this.projectController.getUnits);

        // /unit
        app.route('/units')
        .get(jwt({secret: app.get("jwtSecret")}), this.unitController.getAll)
        .get(jwt({secret: app.get("jwtSecret")}),this.unitController.getAll)
        .post(jwt({secret: app.get("jwtSecret")}), this.unitController.add);

        app.route('/units/:id')
        .get(jwt({secret: app.get("jwtSecret")}), this.unitController.getByKey)
        .get(jwt({secret: app.get("jwtSecret")}),this.unitController.getByKey)
        .put(jwt({secret: app.get("jwtSecret")}), this.unitController.update)
        .delete(jwt({secret: app.get("jwtSecret")}), this.unitController.delete);

        // /floorplan
        app.route('/floorplans')
        .get(jwt({secret: app.get("jwtSecret")}), this.floorplanController.getAll)
        .post(jwt({secret: app.get("jwtSecret")}), this.floorplanController.add);

        app.route('/floorplans/:id')
        .get(jwt({secret: app.get("jwtSecret")}), this.floorplanController.getByKey)
        .put(jwt({secret: app.get("jwtSecret")}), this.floorplanController.update)
        .delete(jwt({secret: app.get("jwtSecret")}), this.floorplanController.delete);

        // /salesAgent
        app.route('/sales-agents')
        .get(jwt({secret: app.get("jwtSecret")}), this.salesAgentController.getAll)
        .post(jwt({secret: app.get("jwtSecret")}), this.salesAgentController.add);

        app.route('/sales-agents/:id')
        .get(jwt({secret: app.get("jwtSecret")}), this.salesAgentController.getByKey)
        .put(jwt({secret: app.get("jwtSecret")}), this.salesAgentController.update)
        .delete(jwt({secret: app.get("jwtSecret")}), this.salesAgentController.delete);

        app.route('/auth/sign-in')
        .post(this.authController.signIn);
    }
}