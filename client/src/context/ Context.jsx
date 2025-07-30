import React, { useState, createContext, useContext, useCallback } from 'react'

export const dataRefreshContext = createContext();
export const authContext = createContext();
export const progressContext = createContext();

// Progress Hook
export const useProgress = () => {
    const context = useContext(progressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

function Context({ children }) {
    const [dataRefresh, setDataRefresh] = useState("")
    const [authStatus, setAuthStatus] = useState(true)
    
    // Progress State Structure
    const [progress, setProgress] = useState({
        stretch: {
            days: {
                // day: { completed: [exerciseIndex], totalExercises: number, todayProgress: percentage }
            },
            overallProgress: 0,
            completedDays: []
        },
        yoga: {
            days: {},
            overallProgress: 0,
            completedDays: []
        }
    });

    // Calculate progress percentage for a specific day - MEMOIZED
    const calculateDayProgress = useCallback((completed, total) => {
        if (total === 0) return 0;
        return Math.round((completed.length / total) * 100);
    }, []);

    // Update progress for a specific exercise - MEMOIZED
    const updateProgress = useCallback((type, day, completedExercises, totalExercises) => {
        setProgress(prev => {
            const newProgress = { ...prev };
            
            // Ensure the type exists
            if (!newProgress[type]) {
                newProgress[type] = { days: {}, overallProgress: 0, completedDays: [] };
            }
            
            if (!newProgress[type].days[day]) {
                newProgress[type].days[day] = {
                    completed: [],
                    totalExercises: totalExercises,
                    todayProgress: 0
                };
            }

            // Update the day's progress
            newProgress[type].days[day].completed = [...completedExercises];
            newProgress[type].days[day].totalExercises = totalExercises;
            newProgress[type].days[day].todayProgress = calculateDayProgress([...completedExercises], totalExercises);

            // Update completed days if day is 100% complete
            if (newProgress[type].days[day].todayProgress === 100) {
                if (!newProgress[type].completedDays.includes(day)) {
                    newProgress[type].completedDays.push(day);
                }
            } else {
                // Remove from completed days if not 100%
                newProgress[type].completedDays = newProgress[type].completedDays.filter(d => d !== day);
            }

            // Calculate overall progress for this type
            const allDays = Object.values(newProgress[type].days);
            const totalProgress = allDays.reduce((sum, dayData) => sum + dayData.todayProgress, 0);
            newProgress[type].overallProgress = allDays.length > 0 ? Math.round(totalProgress / allDays.length) : 0;

            return newProgress;
        });
    }, [calculateDayProgress]);

    // Mark exercise as completed - MEMOIZED
    const markExerciseCompleted = useCallback((type, day, exerciseIndex, totalExercises) => {
        setProgress(prev => {
            const newProgress = { ...prev };
            
            // Ensure the type exists
            if (!newProgress[type]) {
                newProgress[type] = { days: {}, overallProgress: 0, completedDays: [] };
            }
            
            if (!newProgress[type].days[day]) {
                newProgress[type].days[day] = {
                    completed: [],
                    totalExercises: totalExercises,
                    todayProgress: 0
                };
            }

            // Add exercise to completed if not already there
            const completed = newProgress[type].days[day].completed;
            if (!completed.includes(exerciseIndex)) {
                completed.push(exerciseIndex);
            }

            // Update progress
            newProgress[type].days[day].todayProgress = calculateDayProgress(completed, totalExercises);

            // Update completed days if day is 100% complete
            if (newProgress[type].days[day].todayProgress === 100) {
                if (!newProgress[type].completedDays.includes(day)) {
                    newProgress[type].completedDays.push(day);
                }
            }

            // Calculate overall progress
            const allDays = Object.values(newProgress[type].days);
            const totalProgress = allDays.reduce((sum, dayData) => sum + dayData.todayProgress, 0);
            newProgress[type].overallProgress = allDays.length > 0 ? Math.round(totalProgress / allDays.length) : 0;

            return newProgress;
        });
    }, [calculateDayProgress]);

    // Complete entire routine day - MEMOIZED
    const completeRoutine = useCallback((type, day, totalExercises) => {
        setProgress(prev => {
            const newProgress = { ...prev };
            
            // Ensure the type exists
            if (!newProgress[type]) {
                newProgress[type] = { days: {}, overallProgress: 0, completedDays: [] };
            }
            
            // Mark all exercises as completed
            const allExercises = Array.from({ length: totalExercises }, (_, i) => i);
            
            newProgress[type].days[day] = {
                completed: allExercises,
                totalExercises: totalExercises,
                todayProgress: 100
            };

            // Add to completed days if not already there
            if (!newProgress[type].completedDays.includes(day)) {
                newProgress[type].completedDays.push(day);
            }

            // Calculate overall progress
            const allDays = Object.values(newProgress[type].days);
            const totalProgress = allDays.reduce((sum, dayData) => sum + dayData.todayProgress, 0);
            newProgress[type].overallProgress = allDays.length > 0 ? Math.round(totalProgress / allDays.length) : 0;

            return newProgress;
        });
    }, []);

    // Get progress for a specific day - MEMOIZED
    const getDayProgress = useCallback((type, day) => {
        return progress[type]?.days[day] || {
            completed: [],
            totalExercises: 0,
            todayProgress: 0
        };
    }, [progress]);

    // Check if day is completed - MEMOIZED
    const isDayCompleted = useCallback((type, day) => {
        return progress[type]?.completedDays.includes(day) || false;
    }, [progress]);

    // Get overall statistics - MEMOIZED
    const getOverallStats = useCallback(() => {
        const stretchProgress = progress.stretch?.overallProgress || 0;
        const yogaProgress = progress.yoga?.overallProgress || 0;
        
        // Calculate combined overall progress
        const overallProgress = stretchProgress && yogaProgress 
            ? Math.round((stretchProgress + yogaProgress) / 2)
            : stretchProgress || yogaProgress;

        // Calculate today's exercises (get the latest day with progress for each type)
        const getTodayStats = (type) => {
            const days = progress[type]?.days || {};
            const dayNumbers = Object.keys(days).map(Number);
            if (dayNumbers.length === 0) return { completed: [], totalExercises: 0 };
            
            const latestDay = Math.max(...dayNumbers);
            return days[latestDay] || { completed: [], totalExercises: 0 };
        };

        const stretchToday = getTodayStats('stretch');
        const yogaToday = getTodayStats('yoga');

        return {
            overallProgress,
            stretchProgress,
            yogaProgress,
            completedToday: stretchToday.completed.length + yogaToday.completed.length,
            totalExercises: stretchToday.totalExercises + yogaToday.totalExercises,
            // Additional stats
            stretchCompletedDays: progress.stretch?.completedDays.length || 0,
            yogaCompletedDays: progress.yoga?.completedDays.length || 0,
            totalCompletedDays: (progress.stretch?.completedDays.length || 0) + (progress.yoga?.completedDays.length || 0)
        };
    }, [progress]);

    // Reset progress (useful for debugging or starting over) - MEMOIZED
    const resetProgress = useCallback((type = null) => {
        if (type) {
            setProgress(prev => ({
                ...prev,
                [type]: {
                    days: {},
                    overallProgress: 0,
                    completedDays: []
                }
            }));
        } else {
            setProgress({
                stretch: { days: {}, overallProgress: 0, completedDays: [] },
                yoga: { days: {}, overallProgress: 0, completedDays: [] }
            });
        }
    }, []);

    // Get progress summary for a specific type - MEMOIZED
    const getTypeProgress = useCallback((type) => {
        const typeData = progress[type];
        if (!typeData) return null;

        const totalDays = Object.keys(typeData.days).length;
        const completedDays = typeData.completedDays.length;
        const totalExercises = Object.values(typeData.days).reduce((sum, day) => sum + day.totalExercises, 0);
        const completedExercises = Object.values(typeData.days).reduce((sum, day) => sum + day.completed.length, 0);

        return {
            overallProgress: typeData.overallProgress,
            totalDays,
            completedDays,
            totalExercises,
            completedExercises,
            daysProgress: typeData.days
        };
    }, [progress]);

    // MEMOIZE THE ENTIRE PROGRESS VALUE OBJECT
    const progressValue = React.useMemo(() => ({
        progress,
        updateProgress,
        markExerciseCompleted,
        completeRoutine,
        getDayProgress,
        isDayCompleted,
        getOverallStats,
        resetProgress,
        getTypeProgress
    }), [
        progress,
        updateProgress,
        markExerciseCompleted,
        completeRoutine,
        getDayProgress,
        isDayCompleted,
        getOverallStats,
        resetProgress,
        getTypeProgress
    ]);

    return (
        <authContext.Provider value={{ authStatus, setAuthStatus }}>
            <dataRefreshContext.Provider value={{ dataRefresh, setDataRefresh }}>
                <progressContext.Provider value={progressValue}>
                    {children}
                </progressContext.Provider>
            </dataRefreshContext.Provider>
        </authContext.Provider>
    )
};

export default Context;