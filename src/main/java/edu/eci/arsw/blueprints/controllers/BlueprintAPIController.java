/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.Set;

import edu.eci.arsw.blueprints.service.persistence.BlueprintPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import edu.eci.arsw.blueprints.service.model.Blueprint;
import edu.eci.arsw.blueprints.service.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.service.services.BlueprintsServices;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {
    @Autowired
    BlueprintsServices bps = null;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBlueprints() throws BlueprintNotFoundException {
        Set<Blueprint> bp = bps.getAllBlueprints();
        return new ResponseEntity<>(new Gson().toJson(bp), HttpStatus.OK);
    }

    @GetMapping(path = "/{author}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAuthorBlueprint(@PathVariable String author) {
        try {
            Set<Blueprint> bp = bps.getBlueprintsByAuthor(author);
            return new ResponseEntity<>(new Gson().toJson(bp), HttpStatus.OK);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "/{author}/{bpname}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAuthorBlueprintName(@PathVariable String author, @PathVariable String bpname) {
        try {
            Set<Blueprint> bp = bps.getBlueprintsByAuthorBpName(author, bpname);
            return new ResponseEntity<>(new Gson().toJson(bp), HttpStatus.OK);
        } catch (BlueprintNotFoundException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "/crear",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> addBlueprint(@RequestBody Blueprint blueprint) {
        try {
            bps.addNewBlueprint(blueprint);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(path = "/update/{author}/{bpname}",method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<?> updateBlueprint(@PathVariable("author") String author, @PathVariable("bpname") String bpname, @RequestBody Blueprint blueprint) {
        try {
            bps.updateBlueprint(author, bpname, blueprint);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException | BlueprintPersistenceException ex) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>( "No se pudo actualizar el Blueprint", HttpStatus.NOT_FOUND);
        }
    }

}
