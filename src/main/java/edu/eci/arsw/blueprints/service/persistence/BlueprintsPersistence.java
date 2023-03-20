/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.service.persistence;

import java.util.Set;

import edu.eci.arsw.blueprints.service.model.Blueprint;

/**
 *
 * @author hcadavid
 */
public interface BlueprintsPersistence {

    /**
     * 
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException if a blueprint with the same name
     *                                       already exists,
     *                                       or any other low-level persistence
     *                                       error occurs.
     */
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;

    /**
     * 
     * @return All blueprints
     * @throws BlueprintNotFoundException if there is no such blueprints
     */
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException;

    /**
     * 
     * @param author     blueprint's author
     * @param bprintname blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException;

    /**
     * Method that search blueprints by author
     * 
     * @param author author´s name
     * @return ArrayList of BluePrints
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException;

    public void updateBlueprint(String author, String bprintname, Blueprint bp)
            throws BlueprintPersistenceException, BlueprintNotFoundException;

    /**
     * Method that save a given blueprint
     * 
     * @param bp blueprint
     * @throws BlueprintPersistenceException if the blueprint already exists
     */
    public void postBlueprint(Blueprint bp) throws BlueprintPersistenceException;

    /**
     * Method that delete a given blueprint
     * 
     * @param author blueprint's author
     * @param bpname blueprint's name
     * @throws BlueprintPersistenceException if the blueprint doesn't exists
     */
    public void deleteBlueprint(String author, String bpname) throws BlueprintPersistenceException;

}
