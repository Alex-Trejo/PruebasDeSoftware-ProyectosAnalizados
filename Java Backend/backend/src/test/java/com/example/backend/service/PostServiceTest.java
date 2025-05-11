package com.example.backend.service;

import com.example.backend.entity.Post;
import com.example.backend.entity.User;
import com.example.backend.repository.PostRepository;
import com.example.backend.util.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private PostService postService;

    @Captor
    private ArgumentCaptor<Post> postCaptor;

    private User testUser;
    private Post testPost;
    private final Long TEST_USER_ID = 1L;
    private final Long TEST_POST_ID = 1L;
    private final String TEST_TITLE = "Test Title";
    private final String TEST_CONTENT = "Test Content";
    private final String NEW_TITLE = "New Title";
    private final String NEW_CONTENT = "New Content";

    @BeforeEach
    void setUp() {
        testUser = new User("testUser", "password", Role.USER);
        testUser.setId(TEST_USER_ID);

        testPost = new Post(TEST_TITLE, TEST_CONTENT, testUser, true);
        testPost.setId(TEST_POST_ID);
    }

    @Nested
    @DisplayName("Creación de Posts")
    class CreatePostTests {
        @Test
        @DisplayName("Cuando se crea un post válido, entonces se guarda correctamente")
        void whenValidPost_thenSaveSuccessfully() {
            // Arrange
            when(userService.getUserById(TEST_USER_ID)).thenReturn(testUser);
            when(postRepository.save(any(Post.class))).thenReturn(testPost);

            // Act
            Post result = postService.createPost(TEST_USER_ID, TEST_TITLE, TEST_CONTENT, true);

            // Assert
            verify(postRepository).save(postCaptor.capture());
            Post savedPost = postCaptor.getValue();

            assertAll(
                    () -> assertEquals(TEST_TITLE, result.getTitle()),
                    () -> assertEquals(TEST_CONTENT, savedPost.getContent()),
                    () -> assertEquals(testUser, savedPost.getUser()),
                    () -> assertTrue(savedPost.isPublic()),
                    () -> verify(userService).getUserById(TEST_USER_ID)
            );
        }

        @Test
        @DisplayName("Cuando el usuario no existe, entonces lanza excepción")
        void whenUserNotExists_thenThrowsException() {
            // Arrange
            when(userService.getUserById(TEST_USER_ID)).thenReturn(null);

            // Act & Assert
            assertThrows(RuntimeException.class, () ->
                    postService.createPost(TEST_USER_ID, TEST_TITLE, TEST_CONTENT, true)
            );
        }
    }

    @Nested
    @DisplayName("Edición de Posts")
    class EditPostTests {
        @Test
        @DisplayName("Cuando se edita un post existente, entonces se actualiza correctamente")
        void whenExistingPost_thenUpdateSuccessfully() {
            // Arrange
            when(postRepository.findById(TEST_POST_ID)).thenReturn(Optional.of(testPost));
            when(postRepository.save(any(Post.class))).thenReturn(testPost);

            // Act

            // Assert
            verify(postRepository).save(postCaptor.capture());
            Post updatedPost = postCaptor.getValue();

            assertAll(
                    () -> assertEquals(NEW_TITLE, updatedPost.getTitle()),
                    () -> assertEquals(NEW_CONTENT, updatedPost.getContent()),
                    () -> assertFalse(updatedPost.isPublic()),
                    () -> assertEquals(testUser, updatedPost.getUser())
            );
        }

        @Test
        @DisplayName("Cuando el post no existe, entonces lanza excepción")
        void whenPostNotExists_thenThrowsException() {
            // Arrange
            when(postRepository.findById(TEST_POST_ID)).thenReturn(Optional.empty());

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class, () ->
                    postService.editPost(TEST_POST_ID, NEW_TITLE, NEW_CONTENT, false)
            );

            assertEquals("Post no encontrado con ID: " + TEST_POST_ID, exception.getMessage());
        }
    }

    @Nested
    @DisplayName("Eliminación de Posts")
    class DeletePostTests {
        @Test
        @DisplayName("Cuando se elimina un post existente, entonces se borra correctamente")
        void whenExistingPost_thenDeleteSuccessfully() {
            // Arrange
            when(postRepository.existsById(TEST_POST_ID)).thenReturn(true);
            doNothing().when(postRepository).deleteById(TEST_POST_ID);

            // Act
            postService.deletePost(TEST_POST_ID);

            // Assert
            verify(postRepository).existsById(TEST_POST_ID);
            verify(postRepository).deleteById(TEST_POST_ID);
        }

        @Test
        @DisplayName("Cuando el post no existe, entonces lanza excepción")
        void whenPostNotExists_thenThrowsException() {
            // Arrange
            when(postRepository.existsById(TEST_POST_ID)).thenReturn(false);

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class, () ->
                    postService.deletePost(TEST_POST_ID)
            );

            assertEquals("Post no encontrado con ID: " + TEST_POST_ID, exception.getMessage());
        }
    }

    @Nested
    @DisplayName("Obtención de Posts")
    class GetPostTests {
        @Test
        @DisplayName("Cuando se buscan posts por user ID, entonces retorna lista correcta")
        void whenGetByUserId_thenReturnPosts() {
            // Arrange
            when(postRepository.findByUserId(TEST_USER_ID)).thenReturn(List.of(testPost));

            // Act
            List<Post> result = postService.getPostsByUserId(TEST_USER_ID);

            // Assert
            assertAll(
                    () -> assertEquals(1, result.size()),
                    () -> assertEquals(TEST_TITLE, result.get(0).getTitle()),
                    () -> assertEquals(testUser, result.get(0).getUser())
            );
        }

        @Test
        @DisplayName("Cuando se busca un post por ID existente, entonces retorna el post")
        void whenGetById_thenReturnPost() {
            // Arrange
            when(postRepository.findById(TEST_POST_ID)).thenReturn(Optional.of(testPost));

            // Act
            Post result = postService.getPostById(TEST_POST_ID);

            // Assert
            assertAll(
                    () -> assertEquals(TEST_TITLE, result.getTitle()),
                    () -> assertEquals(testUser, result.getUser())
            );
        }

        @Test
        @DisplayName("Cuando se busca un post por ID inexistente, entonces lanza excepción")
        void whenPostNotFound_thenThrowsException() {
            // Arrange
            when(postRepository.findById(TEST_POST_ID)).thenReturn(Optional.empty());

            // Act & Assert
            RuntimeException exception = assertThrows(RuntimeException.class, () ->
                    postService.getPostById(TEST_POST_ID)
            );

            assertEquals("El post con ID " + TEST_POST_ID + " no fue encontrado.", exception.getMessage());
        }
    }
}