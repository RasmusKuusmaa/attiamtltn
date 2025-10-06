package com.attiatlttofafrn.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.dto.Folder.FolderResponse;
import com.attiatlttofafrn.backend.dto.task.TaskRequest;
import com.attiatlttofafrn.backend.dto.task.TaskUpdateRequest;
import com.attiatlttofafrn.backend.model.Folder;
import com.attiatlttofafrn.backend.model.Task;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.FolderRepository;
import com.attiatlttofafrn.backend.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final FolderRepository folderRepository;

    public TaskService(TaskRepository taskRepository, FolderRepository folderRepository) {
        this.taskRepository = taskRepository;
        this.folderRepository = folderRepository;
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

    public Task createTask(User user, String title, Folder folder) {
        Task task = new Task();
        task.setUser(user);
        task.setTitle(title);
        task.setFolder(folder);
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

    public Boolean updateTask(Long taskId, TaskUpdateRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        boolean changed = false;
        if (request.folderid() == null) {
            if (task.getFolder() != null) {
                task.setFolder(null);
                changed = true;
            }
        } else {
            Folder folder = folderRepository.findById(request.folderid())
                    .orElseThrow(() -> new RuntimeException("Folder not found"));
            if (!folder.equals(task.getFolder())) {
                task.setFolder(folder);
                changed = true;
            }
        }

        if (changed) {
            taskRepository.save(task);
        }

        return changed;
    }
}
