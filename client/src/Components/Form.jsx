import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEventData, clearEventData, resetEventState } from "../redux/EventSlice";
import { Home, MessageCircle, Bus, Utensils, Bed, Flag } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Form = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if there's an active event
  const endformId = localStorage.getItem('endformId');
  const currentEventId = localStorage.getItem('currentEventId');
  const hasActiveEvent = endformId; // Only consider it an active event if there's an endformId (existing event)

  // Only read from Redux if there's an active event
  const event = useSelector((state) => {
    if (!hasActiveEvent) return {};
    return state.event?.event || {};
  });
  
  console.log("Form - Current event data from Redux:", event);
  console.log("Form - Has active event:", hasActiveEvent);

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  let role = decodedToken ? decodedToken.designation : null;

  useEffect(() => {
    console.log("=== FORM COMPONENT DEBUG ===");
    console.log("Form - useEffect triggered");
    console.log("Form - Token exists:", !!token);
    
    if (!token) {
      console.log("Form - No token, navigating to home");
      navigate("/");
      return;
    }

    // Check if we're editing an existing event (endformId exists or isEditMode is true)
    const endformId = localStorage.getItem('endformId');
    const isEditMode = localStorage.getItem('isEditMode') === 'true';
    const currentEventId = localStorage.getItem('currentEventId');
    
    console.log("Form - Initial values:");
    console.log("Form - endformId:", endformId);
    console.log("Form - currentEventId:", currentEventId);
    console.log("Form - isEditMode:", isEditMode);
    
    // If we have isEditMode but no currentEventId, this is a stale edit mode - clear it
    if (isEditMode && !currentEventId) {
      console.log("Form - Clearing stale isEditMode flag");
      localStorage.removeItem('isEditMode');
    }
    
    // If we have isEditMode but no endformId, this is also a stale edit mode - clear it
    if (isEditMode && !endformId) {
      console.log("Form - Clearing stale isEditMode flag (no endformId)");
      localStorage.removeItem('isEditMode');
    }
    
    // Only preserve data if we have BOTH endformId AND currentEventId AND isEditMode (indicating a real edit session)
    if (!endformId || !currentEventId || !isEditMode) {
      // No endformId or no currentEventId or no isEditMode means new event creation or stale data - clear everything
      console.log("Form - No endformId or no currentEventId or no isEditMode, clearing all data for fresh start");
      console.log("Form - Condition check:");
      console.log("Form - !endformId:", !endformId);
      console.log("Form - !currentEventId:", !currentEventId);
      console.log("Form - !isEditMode:", !isEditMode);
      
      dispatch(clearEventData());
      dispatch(resetEventState());
      
      // Clear all flags and data
      const itemsToClear = [
        'foodForm', 'guestRoomForm', 'transportForm', 'communicationForm',
        'basicEvent', 'iqacno', 'common_data', 'foodFormData', 'guestRoomFormData',
        'transportFormData', 'communicationFormData', 'foodFormState', 'guestRoomFormState',
        'transportFormState', 'communicationFormState', 'formData', 'selectedOptions',
        'currentFormData', 'eventFormData', 'basicEventId', 'currentEventData',
        'eventData', 'formState', 'communicationState', 'transportState', 'foodState', 'guestRoomState',
        /* 'currentEventId', */ 'endformId', 'isEditMode'
        // Do NOT clear currentEventId for fresh start, only when truly resetting the event flow
      ];
      
      console.log('Form - Clearing all data for fresh start');
      console.log('Form - Before clearing - currentEventId:', localStorage.getItem('currentEventId'));
      console.log('Form - Before clearing - endformId:', localStorage.getItem('endformId'));
      console.log('Form - Before clearing - isEditMode:', localStorage.getItem('isEditMode'));
      itemsToClear.forEach(item => {
        console.log('Form - Removing:', item);
        localStorage.removeItem(item);
      });
      console.log('Form - After clearing - currentEventId:', localStorage.getItem('currentEventId'));
      console.log('Form - After clearing - endformId:', localStorage.getItem('endformId'));
      console.log('Form - After clearing - isEditMode:', localStorage.getItem('isEditMode'));
      
      // Don't generate custom event ID - let the backend create the MongoDB ObjectId
      console.log('Form - Starting fresh event - will use backend-generated ID');
    } else {
      // We have BOTH endformId AND currentEventId AND isEditMode - this is a real edit session, preserve the data
      console.log("Form - Real edit session detected, preserving data for editing:", { endformId, currentEventId, isEditMode });
    }

  }, [token, dispatch, navigate]);

    // The nested routes will handle form rendering
  // We just need to render the Outlet

  useEffect(() => {
    return () => {
      if (!hasActiveEvent) {
        dispatch(clearEventData());
      }
    };
  }, [dispatch, hasActiveEvent]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      width: '100%'
    }}>
      <header style={{ 
        backgroundColor: 'white', 
        padding: '16px 24px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #e5e7eb',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 600, 
            color: '#1f2937',
            margin: 0,
            whiteSpace: 'nowrap'
          }}>
            Event Form Navigator
          </h1>
          <nav style={{ 
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center'
          }}>
            <ul style={{ 
              display: 'flex', 
              gap: '24px', 
              listStyle: 'none',
              margin: 0,
              padding: 0,
              alignItems: 'center'
            }}>
              <li>
                <Link
                  to="/forms/basic"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: location.pathname === "/forms/basic" ? '#3b82f6' : '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === "/forms/basic" ? '#eff6ff' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Home size={18} />
                  <span>Basic Event</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/communication"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: location.pathname === "/forms/communication" ? '#3b82f6' : '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === "/forms/communication" ? '#eff6ff' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Communication</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/transport"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: location.pathname === "/forms/transport" ? '#3b82f6' : '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === "/forms/transport" ? '#eff6ff' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Bus size={18} />
                  <span>Transport</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/food"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: location.pathname === "/forms/food" ? '#3b82f6' : '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === "/forms/food" ? '#eff6ff' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Utensils size={18} />
                  <span>Food</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/guest-room"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: location.pathname === "/forms/guest-room" ? '#3b82f6' : '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === "/forms/guest-room" ? '#eff6ff' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Bed size={18} />
                  <span>Guest Room</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/end"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: location.pathname === "/forms/end" ? '#3b82f6' : '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    backgroundColor: location.pathname === "/forms/end" ? '#eff6ff' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Flag size={18} />
                  <span>End Form</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main style={{ 
        flex: 1,
        padding: '24px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '24px',
          flex: 1,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Form;
