package com.example.springbackenddemo.service.impl;

import com.example.springbackenddemo.exception.ResourceNotFoundException;
import com.example.springbackenddemo.model.Leave;
import com.example.springbackenddemo.repository.LeaveRepository;
import com.example.springbackenddemo.service.LeaveService;
import com.example.springbackenddemo.service.EmailService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmailService emailService;
    public LeaveServiceImpl(LeaveRepository leaveRepository, EmailService emailService) {
        this.leaveRepository = leaveRepository;
        this.emailService = emailService;
    }
    @Override
    public Leave applyLeave(Leave leave) {
        if (leave.getEndDate().isBefore(leave.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        String to = "adminems@yopmail.com";
        String subject = "Leave Approval Request";
        String body = "Dear Admin,\n\n" +
                "A new leave request has been submitted and requires your approval.\n\n" +
                "Employee ID   : " + leave.getEmployee().getId() + "\n" +
                "Leave Type    : " + leave.getLeaveType() + "\n" +
                "Start Date    : " + leave.getStartDate() + "\n" +
                "End Date      : " + leave.getEndDate() + "\n" +
                "Reason        : " + leave.getReason() + "\n\n" +
                "Regards,\nLeave Management System";
        emailService.sendSimpleEmail(to, subject, body);
        return leaveRepository.save(leave);
    }
    @Override
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }
    @Override
    public Leave getLeaveById(long id) {
        return leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave", "Id", id));
    }
    @Override
    public Leave updateLeave(Leave leave, long id) {
        Leave existingLeave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave", "Id", id));
        if (leave.getEndDate().isBefore(leave.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        existingLeave.setLeaveType(leave.getLeaveType());
        existingLeave.setStartDate(leave.getStartDate());
        existingLeave.setEndDate(leave.getEndDate());
        existingLeave.setReason(leave.getReason());
        existingLeave.setStatus(leave.getStatus());
        return leaveRepository.save(existingLeave);
    }

    @Override
    public Leave updateStatus(long id, String status) {
        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave", "Id", id));
        leave.setStatus(status);
        String to = leave.getEmployee().getEmail();
        String subject = "Leave " + status;
        String body = "Dear " + leave.getEmployee().getFirstName() + ",\n\n" +
                "Your leave request has been " + status + ".\n\n" +
                "Leave Type: " + leave.getLeaveType() + "\n" +
                "Start Date: " + leave.getStartDate() + "\n" +
                "End Date: " + leave.getEndDate() + "\n" +
                "Status: " + status + "\n\n" +
                "Regards,\nLeave Management System";
        emailService.sendSimpleEmail(to, subject, body);
        return leaveRepository.save(leave);
    }
    @Override
    public void deleteLeave(long id) {
        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave", "Id", id));
        leaveRepository.delete(leave);
    }
    @Override
    public List<Leave> getLeavesByEmployeeId(long employeeId) {
        return leaveRepository.findByEmployeeId(employeeId);
    }
}