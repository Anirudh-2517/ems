package com.example.springbackenddemo.controller;

import com.example.springbackenddemo.model.Leave;
import com.example.springbackenddemo.service.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000/"})
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private LeaveService leaveService;
    public LeaveController(LeaveService leaveService)
    {
        this.leaveService = leaveService;
    }
    @PostMapping
    public ResponseEntity<Leave> applyLeave(@RequestBody Leave leave)
    {
        return new ResponseEntity<Leave>(leaveService.applyLeave(leave), HttpStatus.CREATED);
    }
    @GetMapping
    public List<Leave> getAllLeaves()
    {
        return leaveService.getAllLeaves();
    }
    @GetMapping("{lid}")
    public ResponseEntity<Leave> getLeaveById(@PathVariable("lid") long leaveId)
    {
        return new ResponseEntity<Leave>(leaveService.getLeaveById(leaveId), HttpStatus.OK);
    }
    @PutMapping("{lid}")
    public ResponseEntity<Leave> updateLeave(@PathVariable("lid") long leaveId, @RequestBody Leave leave)
    {
        return new ResponseEntity<Leave>(leaveService.updateLeave(leave, leaveId), HttpStatus.OK);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<Leave> updateStatus(@PathVariable long id, @RequestParam String status) {
        return new ResponseEntity<>(leaveService.updateStatus(id, status), HttpStatus.OK);
    }
    @DeleteMapping("{lid}")
    public ResponseEntity<String> deleteLeave(@PathVariable("lid") long id)
    {
        leaveService.deleteLeave(id);
        return new ResponseEntity<String>("Leave deleted successfully!", HttpStatus.OK);
    }
    @GetMapping("/employee/{id}")
    public List<Leave> getLeavesByEmployee(@PathVariable long id) {
        return leaveService.getLeavesByEmployeeId(id);
    }
}