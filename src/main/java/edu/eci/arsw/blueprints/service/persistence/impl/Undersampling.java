package edu.eci.arsw.blueprints.service.persistence.impl;

import edu.eci.arsw.blueprints.service.model.Blueprint;
import edu.eci.arsw.blueprints.service.model.Point;
import edu.eci.arsw.blueprints.service.persistence.Filter;
import java.util.ArrayList;
import java.util.List;

//@Service
public class Undersampling implements Filter {
    @Override
    public Blueprint filterPoints(Blueprint bp) {
        List<Point> points = bp.getPoints();
        List<Point> pointsResult = new ArrayList<>();
        for (int i = 0; i < points.size(); i += 2) {
            pointsResult.add(points.get(i));
        }
        bp.setPoints(pointsResult);
        return bp;
    }

}
