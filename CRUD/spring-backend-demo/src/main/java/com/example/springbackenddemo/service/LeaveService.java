package com.example.springbackenddemo.service;

import com.example.springbackenddemo.model.Leave;

import java.util.List;

public interface LeaveService {

    Leave applyLeave(Leave leave);

    List<Leave> getAllLeaves();

    Leave getLeaveById(long id);

    Leave updateLeave(Leave leave, long id);

    Leave updateStatus(long id, String status);

    void deleteLeave(long id);

    List<Leave> getLeavesByEmployeeId(long id);}