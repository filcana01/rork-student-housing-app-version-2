import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Send } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useApp, useListings } from '@/contexts/AppContext';
import { Message } from '@/types';

interface ChatMessage extends Message {
  isMine: boolean;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { userId, listingId } = useLocalSearchParams();
  const { t, user } = useApp();
  const { getListingById } = useListings();
  const flatListRef = useRef<FlatList>(null);
  
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const listing = listingId ? getListingById(Number(listingId)) : null;
  const receiverName = listing?.user ? `${listing.user.firstName} ${listing.user.lastName}` : 'Proprietario';

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadMessages();
  }, [user]);

  const loadMessages = () => {
    const mockMessages: ChatMessage[] = [
      {
        id: 1,
        idUser: Number(userId),
        idSenderUser: Number(userId),
        idReceiverUser: user?.id || 0,
        idListing: listingId ? Number(listingId) : undefined,
        content: 'Buongiorno, sono interessato all&apos;annuncio.',
        isRead: true,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isMine: false,
      },
      {
        id: 2,
        idUser: user?.id || 0,
        idSenderUser: user?.id || 0,
        idReceiverUser: Number(userId),
        idListing: listingId ? Number(listingId) : undefined,
        content: 'Buongiorno! Grazie per l&apos;interesse. Posso aiutarla?',
        isRead: true,
        createdAt: new Date(Date.now() - 3000000).toISOString(),
        isMine: true,
      },
    ];
    setMessages(mockMessages);
  };

  const handleSend = () => {
    if (!message.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      idUser: user.id,
      idSenderUser: user.id,
      idReceiverUser: Number(userId),
      idListing: listingId ? Number(listingId) : undefined,
      content: message.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
      isMine: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 24) {
      return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[
      styles.messageContainer,
      item.isMine ? styles.messageContainerMine : styles.messageContainerOther
    ]}>
      <View style={[
        styles.messageBubble,
        item.isMine ? styles.messageBubbleMine : styles.messageBubbleOther
      ]}>
        <Text style={[
          styles.messageText,
          item.isMine ? styles.messageTextMine : styles.messageTextOther
        ]}>
          {item.content}
        </Text>
        <Text style={[
          styles.messageTime,
          item.isMine ? styles.messageTimeMine : styles.messageTimeOther
        ]}>
          {formatTime(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  if (!user) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <StatusBar style="dark" />
      
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{receiverName}</Text>
          {listing && (
            <Text style={styles.headerListing} numberOfLines={1}>
              {listing.title}
            </Text>
          )}
        </View>
        <View style={styles.headerPlaceholder} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput
          style={styles.input}
          placeholder="Scrivi un messaggio..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Send size={20} color={message.trim() ? Colors.white : Colors.textLight} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  headerListing: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 40,
  },
  messagesList: {
    padding: 16,
    gap: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  messageContainerMine: {
    justifyContent: 'flex-end',
  },
  messageContainerOther: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageBubbleMine: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  messageBubbleOther: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTextMine: {
    color: Colors.white,
  },
  messageTextOther: {
    color: Colors.text,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 2,
  },
  messageTimeMine: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messageTimeOther: {
    color: Colors.textLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: Colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.surface,
  },
});
