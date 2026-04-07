package com.example.springbackenddemo.controller;

import com.example.springbackenddemo.model.Leave;
import com.example.springbackenddemo.service.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;
    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }
    @PostMapping
    public ResponseEntity<Leave> applyLeave(@RequestBody Leave leave) {
        Leave savedLeave = leaveService.applyLeave(leave);
        return new ResponseEntity<>(savedLeave, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Leave>> getAllLeaves() {
        List<Leave> leaves = leaveService.getAllLeaves();
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<Leave> getLeaveById(@PathVariable("id") long id) {
        Leave leave = leaveService.getLeaveById(id);
        return new ResponseEntity<>(leave, HttpStatus.OK);
    }
    @PutMapping("{id}")
    public ResponseEntity<Leave> updateLeave(@PathVariable("id") long id, @RequestBody Leave leave) {
        Leave updatedLeave = leaveService.updateLeave(leave, id);
        return new ResponseEntity<>(updatedLeave, HttpStatus.OK);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Leave> updateStatus(@PathVariable long id, @RequestParam String status) {
        Leave leave = leaveService.updateStatus(id, status);
        return new ResponseEntity<>(leave, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLeave(@PathVariable("id") long id) {
        leaveService.deleteLeave(id);
        return new ResponseEntity<>("Leave deleted successfully!", HttpStatus.OK);
    }
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Leave>> getLeavesByEmployee(@PathVariable long employeeId) {
        List<Leave> leaves = leaveService.getLeavesByEmployeeId(employeeId);
        return new ResponseEntity<>(leaves, HttpStatus.OK);
    }
}