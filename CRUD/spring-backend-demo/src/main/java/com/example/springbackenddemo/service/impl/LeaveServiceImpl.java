package com.example.springbackenddemo.service.impl;

import com.example.springbackenddemo.model.Leave;
import com.example.springbackenddemo.repository.LeaveRepository;
import com.example.springbackenddemo.service.LeaveService;
import org.springframework.stereotype.Service;
import com.example.springbackenddemo.service.EmailService;

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
        String to = "amems@yopmail.com";
        String subject = "Leave Approval Request";
        String body = "Dear Admin,\n\n" +
                "A new leave request has been submitted and requires your approval.\n\n" +
                "Employee Details:\n" +
                "-------------------------\n" +
                "Employee ID   : " + leave.getEmployee().getId() + "\n" +
                "Leave Type    : " + leave.getLeaveType() + "\n" +
                "Start Date    : " + leave.getStartDate() + "\n" +
                "End Date      : " + leave.getEndDate() + "\n" +
                "Reason        : " + leave.getReason() + "\n\n" +
                "Please review and take appropriate action.\n\n" +
                "Regards,\n" +
                "Leave Management System";
        emailService.sendSimpleEmail(to, subject, body);
        return leaveRepository.save(leave);
    }

    @Override
    public List<Leave> getAllLeaves() {
        return leaveRepository.findAll();
    }

    @Override
    public Leave getLeaveById(long id) {
        return leaveRepository.findById(id).orElseThrow();
    }

    @Override
    public Leave updateLeave(Leave leave, long id) {

        if (leave.getEndDate().isBefore(leave.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }

        Leave existingLeave = leaveRepository.findById(id).orElseThrow();

        existingLeave.setLeaveType(leave.getLeaveType());
        existingLeave.setStartDate(leave.getStartDate());
        existingLeave.setEndDate(leave.getEndDate());
        existingLeave.setReason(leave.getReason());
        existingLeave.setStatus(leave.getStatus());

        return leaveRepository.save(existingLeave);
    }

    @Override
    public Leave updateStatus(long id, String status)
    {

        Leave leave = leaveRepository.findById(id).orElseThrow();

        leave.setStatus(status);
        String to = leave.getEmployee().getEmail();
        String subject = "Leave " + status +" ";
        String body = "Dear "+leave.getEmployee().getFirstName()+",\n\n" +
                "Hey congratulations, your leave has "+status+".\n\n" +
                "Leave Details:\n" +
                "-------------------------\n" +
                "Leave Type    : " + leave.getLeaveType() + "\n" +
                "Start Date    : " + leave.getStartDate() + "\n" +
                "End Date      : " + leave.getEndDate() + "\n" +
                "Status        : " + status + "\n\n" +
                "Regards,\n" +
                "Leave Management System";
        emailService.sendSimpleEmail(to, subject, body);

        return leaveRepository.save(leave);
    }

    @Override
    public void deleteLeave(long id)
    {
        leaveRepository.deleteById(id);
    }

    @Override
    public List<Leave> getLeavesByEmployeeId(long id) {
        return leaveRepository.findByEmployeeId(id);
    }
}