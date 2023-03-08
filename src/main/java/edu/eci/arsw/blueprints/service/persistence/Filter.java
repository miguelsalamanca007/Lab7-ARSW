package edu.eci.arsw.blueprints.service.persistence;

import edu.eci.arsw.blueprints.service.model.Blueprint;

public interface Filter {
    Blueprint filterPoints(Blueprint bp);
}
