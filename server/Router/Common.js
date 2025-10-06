import express from "express";
import {
  getCurrentDateEvents,
  getDashboardData,
  getEventStats,
  generateSingleEventPdf,
  getComprehensiveDashboardData,
  getPendingPageData,
  getProfilePageData,
} from "../Controller/Common.js";

const router = express.Router();

// Add middleware to log all requests to this router
router.use((req, res, next) => {
  console.log(`[Common Router] ${req.method} ${req.path}`, req.query);
  next();
});

router.get("/current-date-events", getCurrentDateEvents);
router.get("/dashboard-data", getDashboardData);
router.get("/event-stats", getEventStats);
router.get("/download-event-pdf", generateSingleEventPdf);
router.get("/comprehensive-dashboard-data", getComprehensiveDashboardData);
router.get("/pending-page-data", getPendingPageData);
router.get("/profile-page-data", getProfilePageData);
router.get("/test-pdf", (req, res) => {
  res.json({ message: "PDF endpoint is accessible" });
});

router.get("/test", (req, res) => {
  res.json({
    message: "Common router is working",
    timestamp: new Date().toISOString(),
  });
});

export default router;
