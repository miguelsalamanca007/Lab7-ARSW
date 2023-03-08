/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.service.services;

import edu.eci.arsw.blueprints.service.model.Blueprint;
import edu.eci.arsw.blueprints.service.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.service.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.service.persistence.BlueprintsPersistence;

import java.util.HashSet;
import java.util.Set;

import edu.eci.arsw.blueprints.service.persistence.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {

    @Autowired
    BlueprintsPersistence bpp = null;

    @Autowired
    Filter filter;

    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        try {
            bpp.saveBlueprint(bp);
        } catch (Exception e) {
            throw new BlueprintPersistenceException("Error saving blueprint.", e);
        }
    }

    public Set<Blueprint> getAllBlueprints() {
        Set<Blueprint> blueprints;
        try {
            blueprints = bpp.getAllBlueprints();
        } catch (Exception e) {
            throw new UnsupportedOperationException("Error with the operation on services.");
        }
        return blueprints;
    }

    /**
     * 
     * @param author blueprint's author
     * @param name   blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author, String name) throws BlueprintNotFoundException {
        Blueprint blueprint;
        try {
            blueprint = bpp.getBlueprint(author, name);
            blueprint = filter.filterPoints(blueprint);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Error with the operation on services.");
        }
        return blueprint;
    }

    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> blueprints = bpp.getBlueprintsByAuthor(author);
        Set<Blueprint> blueprintsWithFilter = new HashSet<>();
        for (Blueprint bp : blueprints) {
            bp = filter.filterPoints(bp);
            blueprintsWithFilter.add(bp);
        }
        return blueprintsWithFilter;
    }

    /**
     * @param author blueprint's author
     * @param bpname blueprint's name
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Set<Blueprint> getBlueprintsByAuthorBpName(String author, String bpname) throws BlueprintNotFoundException {
        Set<Blueprint> blueprints;
        Set<Blueprint> blueprintsByName = new HashSet<>();
        try {
            blueprints = bpp.getBlueprintsByAuthor(author);
            for (Blueprint bp : blueprints) {
                if (bp.getName().equals(bpname)) {
                    blueprintsByName.add(bp);
                }
            }
        } catch (BlueprintNotFoundException e) {
            throw e;
        }
        return blueprintsByName;
    }

    public void updateBlueprint(String author,String name, Blueprint bp) throws BlueprintNotFoundException, BlueprintPersistenceException {
        bpp.updateBlueprint(author, name, bp);
    }



}
