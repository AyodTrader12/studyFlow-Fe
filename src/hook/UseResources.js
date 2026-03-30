// useResources.js
// Custom hook for filtering, searching, and managing resources

import { useState, useMemo } from "react";
import resourcesData from "./Resource.json";

export function useResources() {
  const [activeSubject, setActiveSubject] = useState(null); // null = All
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeType, setActiveType] = useState(null); // null = All | "video" | "pdf" | "article"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);

  // Flatten all resources across all subjects & topics
  const allResources = useMemo(() => {
    const flat = [];
    resourcesData.subjects.forEach((subject) => {
      subject.topics.forEach((topic) => {
        topic.resources.forEach((resource) => {
          flat.push({
            ...resource,
            subjectId: subject.id,
            subjectName: subject.name,
            subjectIcon: subject.icon,
            subjectColor: subject.color,
            topicId: topic.id,
            topicName: topic.name,
          });
        });
      });
    });
    return flat;
  }, []);

  // Get topics for the active subject
  const activeTopics = useMemo(() => {
    if (!activeSubject) return [];
    const subject = resourcesData.subjects.find((s) => s.id === activeSubject);
    return subject ? subject.topics : [];
  }, [activeSubject]);

  // Filter resources based on current filters + search
  const filteredResources = useMemo(() => {
    let results = allResources;

    // Filter by subject
    if (activeSubject) {
      results = results.filter((r) => r.subjectId === activeSubject);
    }

    // Filter by topic
    if (activeTopic) {
      results = results.filter((r) => r.topicId === activeTopic);
    }

    // Filter by type
    if (activeType) {
      results = results.filter((r) => r.type === activeType);
    }

    // Search filter — matches title, description, tags, subject, topic
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.subjectName.toLowerCase().includes(q) ||
          r.topicName.toLowerCase().includes(q) ||
          (r.tags && r.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    }

    return results;
  }, [allResources, activeSubject, activeTopic, activeType, searchQuery]);

  // Reset topic when subject changes
  const handleSetActiveSubject = (subjectId) => {
    setActiveSubject(subjectId === activeSubject ? null : subjectId);
    setActiveTopic(null);
  };

  const clearFilters = () => {
    setActiveSubject(null);
    setActiveTopic(null);
    setActiveType(null);
    setSearchQuery("");
  };

  return {
    // Data
    subjects: resourcesData.subjects,
    allResources,
    filteredResources,
    activeTopics,

    // State
    activeSubject,
    activeTopic,
    activeType,
    searchQuery,
    selectedResource,

    // Actions
    setActiveSubject: handleSetActiveSubject,
    setActiveTopic,
    setActiveType,
    setSearchQuery,
    setSelectedResource,
    clearFilters,
  };
}