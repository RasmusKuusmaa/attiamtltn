package com.attiatlttofafrn.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Folders")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folder_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(name = "folder_type", nullable = false)
    private Integer folderType;

    public Long getFolder_id() {
        return folder_id;
    }

    public void setFolder_id(Long folder_id) {
        this.folder_id = folder_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getFolderType() {
        return folderType;
    }

    public void setFolderType(Integer folderType) {
        this.folderType = folderType;
    }

}
