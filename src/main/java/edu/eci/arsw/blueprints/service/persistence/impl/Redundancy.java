package edu.eci.arsw.blueprints.service.persistence.impl;

import edu.eci.arsw.blueprints.service.model.Blueprint;
import edu.eci.arsw.blueprints.service.model.Point;
import edu.eci.arsw.blueprints.service.persistence.Filter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Redundancy implements Filter {

    @Override
    public Blueprint filterPoints(Blueprint bp) {
        List<Point> pts = bp.getPoints();
        List<Point> ptsRepeat = new ArrayList<>();
        for (int i = 0; i < pts.size(); i++) {
            for (int j = i + 1; j < pts.size(); j++) {
                if (equalsPoints(pts.get(i), pts.get(j))) {
                    ptsRepeat.add(pts.get(i));
                    break;
                }
            }
        }
        bp.setPoints(removeRepeatedPoints(ptsRepeat, pts));
        return bp;
    }

    public boolean equalsPoints(Point p1, Point p2) {
        boolean equalsp = false;
        if (p1.getX() == p2.getX() && p1.getY() == p2.getY()) {
            equalsp = true;
        }
        return equalsp;
    }

    /*
     * public List<Point> removeRepeatedPoints(List<Point> pstRepeat, List<Point>
     * ptsAll) {
     * List<Point> listNew = new ArrayList<>(ptsAll);
     * listNew.removeAll(pstRepeat);
     * return listNew;
     * }
     */

    public List<Point> removeRepeatedPoints(List<Point> ptsRepeat, List<Point> ptsAll) {
        List<Point> result = new ArrayList<>(ptsAll);
        for (Point repeat : ptsRepeat) {
            result.remove(repeat);
        }
        return result;
    }

}
