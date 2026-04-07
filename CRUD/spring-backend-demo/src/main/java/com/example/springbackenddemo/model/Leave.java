package com.example.springbackenddemo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "leaves")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long lid;
    @Column(name = "leave_type")
    private String leaveType;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "reason")
    private String reason;
    @Column(name = "status")
    private String status;
    @ManyToOne
    @JoinColumn(name = "id")
    @JsonBackReference
    private Employee employee;
}