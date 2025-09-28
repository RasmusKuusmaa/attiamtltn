package com.attiatlttofafrn.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.Task;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasksForUser(User user) {
        return taskRepository.findByUser(user);
    }

    public boolean deleteTask(Long id) {
        return taskRepository.findById(id).map(task -> {
            taskRepository.delete(task);
            return true;
        }).orElse(false);
    }

    public Task createTask(User user, String title) {
        Task task = new Task();
        task.setUser(user);
        task.setTitle(title);
        task.setCompleted(false);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public boolean toggleTaskCompletion(Long taskId, User user) {
        return taskRepository.findById(taskId)
                .map(task -> {
                    if (!task.getUser().getUser_id().equals(user.getUser_id())) {
                        throw new SecurityException("You cannot modify this task");
                    }

                    if (!task.getCompleted()) {
                        task.setCompleted(true);
                        task.setCompletedAt(LocalDateTime.now());
                    } else {
                        task.setCompleted(false);
                        task.setCompletedAt(null);
                    }

                    taskRepository.save(task);
                    return true;
                })
                .orElse(false);
    }

}
