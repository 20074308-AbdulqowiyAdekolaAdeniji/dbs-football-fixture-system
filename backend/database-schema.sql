-- DBS Football Fixture Management System
-- Database Schema
-- Created: 2025-11-02

-- Main fixtures table
CREATE TABLE IF NOT EXISTS fixtures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    opposition TEXT NOT NULL,
    match_date TEXT NOT NULL,
    match_time TEXT NOT NULL,
    venue TEXT NOT NULL,
    home_score INTEGER DEFAULT NULL,
    away_score INTEGER DEFAULT NULL,
    status TEXT DEFAULT 'scheduled',
    competition_type TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Venues table (optional - for future enhancement)
CREATE TABLE IF NOT EXISTS venues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    location TEXT NOT NULL,
    capacity INTEGER,
    facilities TEXT
);