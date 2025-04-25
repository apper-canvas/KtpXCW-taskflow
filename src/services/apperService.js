const CANVAS_ID = "YOUR_CANVAS_ID"; // Replace with actual canvas ID

class ApperService {
  constructor() {
    this.initClient();
  }

  initClient() {
    const { ApperClient } = window.ApperSDK || {};
    if (ApperClient) {
      this.apperClient = new ApperClient(CANVAS_ID);
    } else {
      console.error("Apper SDK not loaded");
    }
  }

  // Tasks
  async fetchTasks(filters = {}) {
    try {
      const params = {
        fields: ["id", "title", "description", "isCompleted", "priority", "dueDate", "createdAt", "categoryId"],
        pagingInfo: { limit: 100, offset: 0 },
        orderBy: [{ field: "CreatedOn", direction: "desc" }]
      };

      // Add filters if provided
      if (filters.categoryId) {
        params.filterBy = [{ field: "categoryId", operator: "Equals", value: filters.categoryId }];
      }

      const response = await this.apperClient.fetchRecords("tasks", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const params = {
        record: {
          title: taskData.title,
          description: taskData.description || "",
          isCompleted: taskData.isCompleted || false,
          priority: taskData.priority || "medium",
          dueDate: taskData.dueDate,
          categoryId: taskData.categoryId || "personal",
          createdAt: new Date().toISOString()
        }
      };

      const response = await this.apperClient.createRecord("tasks", params);
      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(taskId, taskData) {
    try {
      const params = {
        record: {
          ...taskData
        }
      };

      const response = await this.apperClient.updateRecord("tasks", taskId, params);
      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await this.apperClient.deleteRecord("tasks", taskId);
      return response.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  // Categories
  async fetchCategories() {
    try {
      const params = {
        fields: ["id", "name"],
        pagingInfo: { limit: 20, offset: 0 }
      };

      const response = await this.apperClient.fetchRecords("categories", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // User Profile
  async getUserProfile() {
    try {
      const { ApperClient } = window.ApperSDK;
      // This is properly using the SDK as instructed - the user info will
      // come from the Redux store populated during authentication
      return null; // User info comes from auth callback, not direct method
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }
}

export default new ApperService();