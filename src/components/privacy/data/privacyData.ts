// data/termsData.ts
export type SimpleContent = {
  subtitle?: string;
  content: string;
};

export type StructuredContent = {
  subtitle?: string;
  content: {
    info: string;
    intent: string;
  };
};

export type TermsSection = {
  id: number;
  title: string;
  explan?: string;
  data?: (SimpleContent | StructuredContent)[];
  content?: string;
};

export const TERMS_DATA: TermsSection[] = [
  {
    id: 1,
    title: '1. Introduction',
    data: [
      {
        subtitle: '1. Introduction',
        content: `Welcome to Apollo NFT. This Privacy Policy explains how we collect, use, and protect your information when you access and use our services. We are committed to protecting your privacy and ensuring transparency in all data processing activities.`,
      },
      {
        subtitle: '2. Data we collect',
        content: `We collect publicly available data on the blockchain, including your public wallet address and transaction history. In addition, we may collect personal information that you voluntarily provide, such as your email address when you sign up for a newsletter or contact support.`,
      },
      {
        subtitle: '3. How we use data',
        content: `The data is collected for the purpose of providing and improving the service, processing transactions, ensuring the security of the platform and communicating with you. We do not sell your personal information to third parties. Anonymized data may be used for analytical purposes to enhance user experience.`,
      },
      {
        subtitle: '4. Data security',
        content: `We employ industry-standard security measures to protect your information from unauthorized access, alteration, or disclosure. While we strive to protect your data, no method of transmission over the Internet or electronic storage is 100% secure.`,
      },
      {
        subtitle: '5. Cookie Policy',
        content: `We use cookies and similar tracking technologies to improve your browsing experience, analyze traffic, and personalize content. You can manage your cookie preferences through your browser settings.`,
      },
      {
        subtitle: '6. Your Rights',
        content: `You have the right to access, update, delete or restrict the processing of your personal data. You also have the right to object to the processing of your data and to request data portability. To exercise these rights, please contact us using the information provided below.`,
      },
      {
        subtitle: '7. Contract',
        content: `If you have any questions about this Privacy Policy or would like to exercise your rights, please contact us by email: privacy@apollonft.com or via the contact form on our website.`,
      },
    ],
  },
  {
    id: 2,
    title: '2. Data we collect',
    explan: `Mục tiêu chính: Làm rõ các loại dữ liệu mà ApolloNFT thu thập, cách chúng được thu thập và lý do vì sao việc thu thập đó là cần thiết để đảm bảo hoạt động của nền tảng, tăng cường bảo mật và mang lại trải nghiệm tốt nhất cho người dùng.
Chúng tôi cam kết chỉ thu thập lượng thông tin tối thiểu cần thiết, tuân thủ nguyên tắc minh bạch và bảo vệ quyền riêng tư của bạn.`,
    data: [
      {
        subtitle:
          '2.1.Dữ liệu do bạn trực tiếp cung cấp (Information You Provide Directly)',
        content: {
          info: `Khi sử dụng ApolloNFT, bạn có thể chủ động cung cấp một số thông tin, bao gồm:
- Địa chỉ ví (Wallet Address): Là định danh duy nhất của tài khoản trên nền tảng.
- Thông tin hồ sơ cá nhân: Nếu bạn chọn tùy chỉnh hồ sơ, có thể bao gồm tên hiển thị, ảnh đại diện, hoặc mô tả ngắn.
- Dữ liệu giao dịch: Bao gồm thông tin về các hoạt động như mua, bán, mint, đấu giá hoặc niêm yết NFT.
- Liên hệ và hỗ trợ: Các nội dung bạn gửi đến đội ngũ ApolloNFT qua email, biểu mẫu hoặc kênh cộng đồng.`,
          intent: `Để vận hành các tính năng cốt lõi của nền tảng, xử lý giao dịch, phản hồi yêu cầu hỗ trợ và nâng cao chất lượng trải nghiệm người dùng.`,
        },
      },
      {
        subtitle:
          '2.2. Dữ liệu được thu thập tự động (Information Collected Automatically)',
        content: {
          info: `Khi bạn truy cập ApolloNFT, hệ thống tự động thu thập một số thông tin kỹ thuật, bao gồm:
- Dữ liệu thiết bị và kết nối: Loại trình duyệt, thiết bị, hệ điều hành, địa chỉ IP (ẩn danh) và thời gian truy cập.
- Dữ liệu sử dụng (Usage Data): Các trang bạn truy cập, tính năng bạn tương tác và thời lượng sử dụng.
- Cookie và công nghệ tương tự: Giúp ghi nhớ tùy chọn, quản lý phiên đăng nhập và tối ưu hiệu suất tải trang.`,
          intent: `Vạch ra ranh giới trách nhiệm pháp lý rõ ràng. Nền tảng không chịu trách nhiệm về các vấn đề của MetaMask hay các ví khác.`,
        },
      },
      {
        subtitle:
          '2.3. Dữ liệu công khai trên blockchain (Public Blockchain Data)',
        content: {
          info: `Do ApolloNFT hoạt động trên nền tảng blockchain công khai, một số thông tin của bạn được ghi nhận và hiển thị công khai, bao gồm:
- Địa chỉ ví, lịch sử giao dịch NFT, lịch sử sở hữu và tương tác hợp đồng thông minh (smart contract).
- Các dữ liệu này được lưu trữ vĩnh viễn trên blockchain và không thể chỉnh sửa hoặc xóa.`,
          intent: `Giải thích cho người dùng hiểu rõ rằng minh bạch là đặc điểm cố hữu của Web3, và ApolloNFT không kiểm soát hoặc chỉnh sửa được dữ liệu đã ghi trên blockchain. Việc hiển thị công khai này giúp bảo đảm tính xác thực, minh bạch và nguồn gốc tài sản NFT.`,
        },
      },
      {
        subtitle: '2.4. Dữ liệu từ bên thứ ba (Information from Third Parties)',
        content: {
          info: `Trong một số trường hợp, ApolloNFT có thể nhận thông tin từ các đối tác bên ngoài để phục vụ cho hoạt động của nền tảng, bao gồm:
- Nhà cung cấp ví (Wallet Providers): Dữ liệu xác thực ví và thông tin kết nối.
- Đối tác phân tích hoặc bảo mật: Dữ liệu phục vụ phát hiện gian lận, lỗi hệ thống hoặc hoạt động bất thường.
- Đối tác tiếp thị và cộng đồng: Dữ liệu tổng hợp (không định danh) nhằm đánh giá hiệu quả chiến dịch hoặc tương tác người dùng.`,
          intent: `Đảm bảo tính an toàn, tuân thủ và nâng cao hiệu suất vận hành của nền tảng; đồng thời duy trì trải nghiệm người dùng mượt mà và đáng tin cậy.`,
        },
      },
      {
        subtitle:
          '2.5. Nguyên tắc tối giản và lưu trữ dữ liệu (Data Minimization and Retention)',
        content: {
          info: `ApolloNFT chỉ thu thập và lưu trữ những dữ liệu thực sự cần thiết cho việc cung cấp dịch vụ.
Chúng tôi không bán, cho thuê hay chia sẻ dữ liệu cá nhân cho bất kỳ bên thứ ba nào vì mục đích thương mại.
Dữ liệu không thuộc blockchain (như email hoặc nội dung hỗ trợ) sẽ được lưu giữ trong thời gian giới hạn cần thiết cho mục đích pháp lý, kỹ thuật hoặc bảo mật.`,
          intent: `Thể hiện cam kết của ApolloNFT trong việc bảo vệ quyền riêng tư, tuân thủ các nguyên tắc bảo mật và quy định bảo vệ dữ liệu quốc tế (như GDPR).`,
        },
      },
    ],
  },
  {
    id: 3,
    title: '3. How We Use Your Data',
    explan: `Mục tiêu chính:Làm rõ cách ApolloNFT sử dụng các loại dữ liệu được thu thập, đảm bảo rằng mọi hoạt động xử lý dữ liệu đều phục vụ mục đích hợp pháp, minh bạch và vì lợi ích của người dùng.
Chúng tôi không bán, cho thuê hay trao đổi dữ liệu cá nhân vì mục đích thương mại.`,
    data: [
      {
        subtitle:
          '3.1. Cung cấp và vận hành dịch vụ (Providing and Operating Our Services)',
        content: {
          info: `Chúng tôi sử dụng dữ liệu của bạn để:
- Cho phép bạn kết nối ví, thực hiện giao dịch NFT, và tương tác với hợp đồng thông minh (smart contract).
- Duy trì và cải thiện hiệu suất nền tảng, ngăn ngừa lỗi kỹ thuật hoặc sự cố giao dịch.
- Hỗ trợ xác thực và quản lý quyền truy cập vào các tính năng đặc biệt (ví dụ: tạo NFT, tham gia drop hoặc marketplace).`,
          intent: ` Đảm bảo hoạt động trơn tru của nền tảng ApolloNFT, giúp người dùng có thể tương tác an toàn với hệ thống Web3.`,
        },
      },
      {
        subtitle:
          '3.2. Bảo mật và ngăn chặn gian lận (Security and Fraud Prevention)',
        content: {
          info: `Dữ liệu được sử dụng để phát hiện, ngăn chặn và điều tra các hành vi bất hợp pháp, gian lận hoặc vi phạm Điều khoản Dịch vụ.
Bao gồm việc phân tích hành vi đáng ngờ, giám sát giao dịch bất thường, hoặc xác minh tính hợp lệ của các yêu cầu từ người dùng.`,
          intent: `Bảo vệ tài sản của người dùng, ngăn ngừa các hành vi tấn công, và duy trì môi trường an toàn cho cộng đồng ApolloNFT.`,
        },
      },
      {
        subtitle:
          '3.3. Cải thiện trải nghiệm người dùng (Improving User Experience)',
        content: {
          info: `ApolloNFT có thể phân tích dữ liệu sử dụng (usage data) để hiểu rõ hơn về hành vi, nhu cầu và mức độ tương tác của người dùng.
Chúng tôi có thể sử dụng dữ liệu tổng hợp (không định danh) nhằm:
- Tối ưu giao diện và hiệu suất trang web.
- Cải thiện tốc độ tải trang và chất lượng hiển thị.
- Điều chỉnh tính năng mới theo phản hồi thực tế.`,
          intent: `Nâng cao chất lượng dịch vụ và mang lại trải nghiệm thân thiện, nhanh chóng và đáng tin cậy cho người dùng.`,
        },
      },
      {
        subtitle:
          '3.4. Giao tiếp và hỗ trợ người dùng (Communication and Support)',
        content: {
          info: `Nếu bạn liên hệ với đội ngũ ApolloNFT, dữ liệu liên quan (như email, nội dung tin nhắn, hoặc thông tin ví) có thể được sử dụng để:
- Trả lời yêu cầu hỗ trợ hoặc phản hồi.
- Gửi thông báo về thay đổi dịch vụ, bảo trì, hoặc cập nhật chính sách.
- Cung cấp thông tin về các chương trình, sự kiện hoặc tính năng mới (nếu bạn đồng ý nhận thông tin).`,
          intent: `Duy trì giao tiếp minh bạch, cung cấp hỗ trợ kịp thời và thông báo cho người dùng về các vấn đề quan trọng liên quan đến nền tảng.`,
        },
      },
      {
        subtitle:
          '3.5. Tuân thủ pháp luật và nghĩa vụ pháp lý (Legal and Regulatory Compliance)',
        content: {
          info: `ApolloNFT có thể sử dụng hoặc lưu trữ dữ liệu của bạn khi cần thiết để:
- Tuân thủ quy định pháp luật, yêu cầu từ cơ quan chức năng hoặc cơ quan tư pháp.
- Thực hiện nghĩa vụ pháp lý liên quan đến phòng chống rửa tiền (AML) hoặc chống tài trợ khủng bố (CFT).
- Giải quyết tranh chấp hoặc khiếu nại liên quan đến hoạt động trên nền tảng.`,
          intent: `Đảm bảo ApolloNFT hoạt động hợp pháp, minh bạch và phù hợp với các tiêu chuẩn quốc tế về bảo mật và tuân thủ.`,
        },
      },
      {
        subtitle:
          '3.6. Mục đích nghiên cứu và phát triển (Research and Development)',
        content: {
          info: `Chúng tôi có thể sử dụng dữ liệu tổng hợp (aggregate data) hoặc dữ liệu ẩn danh để phục vụ nghiên cứu nội bộ, thử nghiệm, và phát triển các tính năng hoặc công nghệ mới.
Tất cả dữ liệu được sử dụng cho mục đích này đều không chứa thông tin cá nhân định danh.`,
          intent: `Thúc đẩy đổi mới, cải tiến tính năng và đảm bảo ApolloNFT phát triển bền vững trong hệ sinh thái Web3.`,
        },
      },
    ],
  },
  {
    id: 4,
    title: '4. Data security',
    explan: `Đảm bảo người dùng hiểu cách ApolloNFT bảo vệ dữ liệu của họ, bao gồm cả thông tin liên quan đến ví, giao dịch NFT và dữ liệu cá nhân do người dùng cung cấp.
Nhấn mạnh rằng mặc dù ApolloNFT áp dụng các biện pháp bảo mật nghiêm ngặt, người dùng vẫn phải chịu trách nhiệm về bảo mật ví và các thông tin đăng nhập của mình.`,
    data: [
      {
        subtitle: '4.1. Biện pháp bảo mật dữ liệu (Security Measures)',
        content: {
          info: `ApolloNFT áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ dữ liệu người dùng, bao gồm:
- Mã hóa dữ liệu nhạy cảm khi truyền tải (TLS/HTTPS).
- Lưu trữ dữ liệu quan trọng trên hệ thống được bảo mật với các cơ chế kiểm soát truy cập.
- Giám sát và phát hiện các hành vi bất thường để ngăn ngừa xâm nhập hoặc tấn công.`,
          intent: `Bảo vệ dữ liệu khỏi truy cập trái phép, thay đổi, rò rỉ hoặc phá hủy, đồng thời nâng cao sự tin tưởng của người dùng vào nền tảng.`,
        },
      },
      {
        subtitle:
          '4.2. Bảo mật ví và khóa riêng tư (Wallet and Private Key Security)',
        content: {
          info: `- ApolloNFT không lưu trữ khóa riêng tư (private keys) hay seed phrases của người dùng.
- Mọi giao dịch được ký trực tiếp từ ví của bạn thông qua nhà cung cấp ví bên thứ ba.
- Nền tảng cung cấp chỉ giao diện tương tác an toàn, không thể truy cập vào tài sản của bạn mà không có sự cho phép của chính bạn.`,
          intent: `Nhấn mạnh phân tách trách nhiệm: ApolloNFT không thể truy cập hay chịu trách nhiệm về mất mát tài sản nếu khóa riêng tư bị lộ.`,
        },
      },
      {
        subtitle: '4.3. Trách nhiệm của người dùng (User Responsibilities)',
        content: {
          info: `Người dùng phải:
- Bảo vệ thiết bị, trình duyệt và phần mềm kết nối với ví của mình.
- Giữ bí mật khóa riêng tư và seed phrase.
- Không chia sẻ thông tin đăng nhập với bất kỳ ai.
- Ngay lập tức báo cáo nếu phát hiện hành vi đáng ngờ hoặc truy cập trái phép vào tài khoản/ví.`,
          intent: `Giáo dục người dùng về các nguyên tắc cơ bản của bảo mật Web3 và giảm rủi ro từ việc lơ là bảo vệ thông tin cá nhân.`,
        },
      },
      {
        subtitle: '4.4. Giới hạn trách nhiệm (Limitation of Liability)',
        content: {
          info: `ApolloNFT không chịu trách nhiệm về:
- Bất kỳ tổn thất tài sản (NFT, tiền điện tử) do xâm nhập ví hoặc mất khóa riêng tư.
- Thiệt hại phát sinh từ lỗi phần mềm ví bên thứ ba hoặc các nhà cung cấp dịch vụ liên quan.
- Hậu quả của việc người dùng không tuân thủ các biện pháp bảo mật cá nhân.`,
          intent: `Đặt ranh giới pháp lý rõ ràng để bảo vệ nền tảng khỏi các khiếu nại liên quan đến mất mát tài sản do lỗi của người dùng hoặc bên thứ ba.`,
        },
      },
      {
        subtitle: '4.5. Thông báo vi phạm dữ liệu (Data Breach Notification)',
        content: {
          info: `Trong trường hợp có vi phạm bảo mật hoặc rủi ro nghiêm trọng ảnh hưởng đến dữ liệu người dùng, ApolloNFT sẽ:
- Thông báo cho người dùng trong thời gian sớm nhất có thể.
- Hướng dẫn các bước cần thiết để bảo vệ tài sản và tài khoản của người dùng.`,
          intent: `Đảm bảo minh bạch, kịp thời trong việc phản ứng với sự cố bảo mật và giảm thiểu rủi ro cho người dùng.`,
        },
      },
    ],
  },
  {
    id: 5,
    title: '5. Cookie Policy',
    explan: `Mục tiêu chính: Làm rõ cách ApolloNFT sử dụng cookie và các công nghệ tương tự để ghi nhớ tùy chọn người dùng, phân tích hiệu suất hệ thống và nâng cao trải nghiệm sử dụng.
Người dùng có quyền kiểm soát việc sử dụng cookie thông qua cài đặt trình duyệt hoặc công cụ quản lý quyền riêng tư.`,
    data: [
      {
        subtitle: '5.1. Cookie là gì? (What Are Cookies)',
        content: {
          info: `Cookie là các tệp nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại hoặc máy tính bảng) khi bạn truy cập vào ApolloNFT.
Chúng giúp hệ thống ghi nhớ thông tin truy cập, như tùy chọn ngôn ngữ, thời gian đăng nhập, hoặc các hành động bạn đã thực hiện.
ApolloNFT cũng có thể sử dụng các công nghệ tương tự như Local Storage, Web Beacons, hoặc Tracking Pixels với chức năng tương tự.`,
          intent: `Giải thích bản chất của cookie và giúp người dùng hiểu rằng đây là công nghệ tiêu chuẩn được sử dụng rộng rãi để tối ưu trải nghiệm duyệt web.`,
        },
      },
      {
        subtitle:
          '5.2. Các loại cookie mà chúng tôi sử dụng (Types of Cookies We Use)',
        content: {
          info: `ApolloNFT sử dụng bốn nhóm cookie chính:
- Strictly Necessary Cookies – cần thiết để nền tảng hoạt động (ví dụ: ghi nhớ ví đã kết nối hoặc xác thực phiên người dùng).
- Performance Cookies – thu thập dữ liệu ẩn danh về cách người dùng tương tác để cải thiện tốc độ và ổn định hệ thống.
- Functional Cookies – ghi nhớ các tùy chọn người dùng (như ngôn ngữ, chế độ giao diện) nhằm cá nhân hóa trải nghiệm.
- Analytics and Marketing Cookies – được dùng hạn chế để phân tích lưu lượng truy cập hoặc đo lường hiệu quả chiến dịch (chỉ khi người dùng đồng ý).`,
          intent: `Phân loại rõ ràng từng loại cookie để người dùng hiểu vai trò và lý do tồn tại của chúng, giúp tăng tính minh bạch và tuân thủ quy định bảo mật.`,
        },
      },
      {
        subtitle: '5.3. Cách chúng tôi sử dụng cookie (How We Use Cookies)',
        content: {
          info: `ApolloNFT sử dụng cookie để:

- Ghi nhớ phiên đăng nhập và địa chỉ ví của người dùng.
- Lưu trữ lựa chọn cá nhân (ngôn ngữ, chế độ sáng/tối).
- Đo lường hiệu năng website, xác định lỗi hệ thống.
- Phân tích hành vi người dùng (dưới dạng tổng hợp, không định danh).
- Chúng tôi không sử dụng cookie để lưu trữ thông tin nhạy cảm như khóa riêng tư, seed phrase, hoặc dữ liệu ví điện tử.`,
          intent: `Đảm bảo cookie chỉ được dùng phục vụ vận hành, bảo mật và cải thiện trải nghiệm — không xâm phạm quyền riêng tư của người dùng.`,
        },
      },
      {
        subtitle: '5.4. Quản lý và tắt cookie (Managing and Disabling Cookies)',
        content: {
          info: `Bạn có thể kiểm soát hoặc xóa cookie bất kỳ lúc nào thông qua cài đặt của trình duyệt.
Thông thường, người dùng có thể:
- Chặn tất cả cookie.
- Cho phép cookie cho một số trang cụ thể.
- Xóa cookie đã lưu sau khi đóng trình duyệt.
Tuy nhiên, việc vô hiệu hóa cookie có thể khiến một số tính năng của ApolloNFT (như đăng nhập bằng ví hoặc cá nhân hóa giao diện) không hoạt động đúng cách.`,
          intent: `Trao quyền kiểm soát cho người dùng, đồng thời giúp họ hiểu rõ ảnh hưởng khi tắt cookie đến trải nghiệm và khả năng tương tác với nền tảng.`,
        },
      },
      {
        subtitle: '5.5. Cookie của bên thứ ba (Third-Party Cookies)',
        content: {
          info: `Một số cookie có thể được đặt bởi bên thứ ba đáng tin cậy mà ApolloNFT hợp tác, chẳng hạn:
- Dịch vụ phân tích (Google Analytics, Mixpanel, v.v.) để đánh giá hiệu suất.
- Công cụ bảo mật hoặc chống gian lận.
- Nền tảng cộng đồng hoặc tiếp thị (nếu có).
Các bên thứ ba này chỉ được phép sử dụng cookie của họ để thực hiện các mục đích hợp pháp theo chỉ đạo của ApolloNFT và phải tuân thủ chính sách bảo mật dữ liệu hiện hành.`,
          intent: `Đảm bảo tính minh bạch trong việc tích hợp công cụ của bên thứ ba, đồng thời giới hạn phạm vi sử dụng cookie vào các mục tiêu được phép.`,
        },
      },
      {
        subtitle:
          '5.6. Cập nhật chính sách cookie (Updates to This Cookie Policy)',
        content: {
          info: `ApolloNFT có thể cập nhật Chính sách Cookie theo thời gian để phản ánh thay đổi trong công nghệ hoặc quy định pháp lý.
Phiên bản cập nhật sẽ được công bố công khai cùng với ngày hiệu lực.`,
          intent: `Đảm bảo người dùng luôn được thông báo và có thể theo dõi mọi thay đổi liên quan đến quyền riêng tư và công nghệ theo dõi.`,
        },
      },
    ],
  },
  {
    id: 6,
    title: '6. Your Rights',
    explan: `Mục tiêu chính: Làm rõ quyền của người dùng liên quan đến dữ liệu cá nhân và thông tin blockchain mà họ cung cấp hoặc tạo ra trên nền tảng ApolloNFT.
Giúp người dùng kiểm soát dữ liệu của mình và đảm bảo tính minh bạch trong việc xử lý thông tin cá nhân.`,
    data: [
      {
        subtitle: '6.1. Quyền truy cập dữ liệu (Right to Access)',
        content: {
          info: `Người dùng có quyền yêu cầu ApolloNFT cung cấp thông tin về dữ liệu cá nhân mà nền tảng lưu trữ liên quan đến họ, bao gồm:
- Thông tin tài khoản (wallet address, hồ sơ cá nhân).
- Dữ liệu giao dịch và các tương tác trên nền tảng.
- Các bản sao của thông tin được lưu trữ trong hệ thống hỗ trợ hoặc lưu trữ dữ liệu.`,
          intent: `Cho phép người dùng kiểm tra, xác minh dữ liệu của mình và đảm bảo rằng ApolloNFT xử lý dữ liệu minh bạch và chính xác.`,
        },
      },
      {
        subtitle: '6.2. Quyền chỉnh sửa dữ liệu (Right to Rectification)',
        content: {
          info: `Người dùng có quyền yêu cầu sửa chữa hoặc cập nhật dữ liệu cá nhân không chính xác hoặc không đầy đủ, ví dụ:
- Tên hiển thị, ảnh đại diện, thông tin hồ sơ tùy chọn.`,
          intent: `Đảm bảo dữ liệu cá nhân luôn chính xác, giúp trải nghiệm nền tảng phù hợp và giảm rủi ro nhầm lẫn trong các giao dịch NFT.`,
        },
      },
      {
        subtitle:
          '6.3. Quyền xóa dữ liệu (Right to Erasure / Right to Be Forgotten)',
        content: {
          info: `Người dùng có thể yêu cầu xóa dữ liệu cá nhân mà họ cung cấp trực tiếp (ví dụ: hồ sơ tùy chọn, email liên hệ) trong phạm vi pháp luật cho phép.
Lưu ý: dữ liệu blockchain không thể bị xóa, vì các giao dịch và quyền sở hữu NFT là công khai và bất biến trên blockchain.`,
          intent: `Tôn trọng quyền riêng tư của người dùng, đồng thời thông báo rõ giới hạn liên quan đến tính bất biến của blockchain.`,
        },
      },
      {
        subtitle:
          '6.4. Quyền hạn chế xử lý dữ liệu (Right to Restrict Processing)',
        content: {
          info: `Người dùng có quyền yêu cầu hạn chế hoặc tạm ngừng xử lý dữ liệu cá nhân của họ cho các mục đích không cần thiết, trừ các trường hợp bắt buộc theo pháp luật hoặc vận hành nền tảng.`,
          intent: `Cho phép người dùng kiểm soát mức độ xử lý dữ liệu cá nhân của họ mà vẫn đảm bảo các giao dịch blockchain và hoạt động cơ bản trên nền tảng không bị gián đoạn.`,
        },
      },
      {
        subtitle: '6.5. Quyền phản đối xử lý dữ liệu (Right to Object)',
        content: {
          info: `Người dùng có quyền phản đối việc sử dụng dữ liệu cá nhân cho các mục đích tiếp thị hoặc phân tích, ngoại trừ các xử lý cần thiết để vận hành dịch vụ.`,
          intent: `Đảm bảo người dùng có quyền quyết định việc dữ liệu của họ được sử dụng cho mục đích không thiết yếu, tăng cường kiểm soát quyền riêng tư.`,
        },
      },

      {
        subtitle: '6.6. Quyền rút lại sự đồng ý (Right to Withdraw Consent)',
        content: {
          info: `Nếu người dùng đã đồng ý cho ApolloNFT sử dụng dữ liệu cá nhân (ví dụ: nhận thông báo hoặc marketing), họ có quyền rút lại sự đồng ý bất cứ lúc nào.
Hệ thống sẽ ngừng sử dụng dữ liệu cho mục đích đó ngay khi nhận được yêu cầu.`,
          intent: `Tôn trọng quyền tự chủ của người dùng và đảm bảo mọi xử lý dữ liệu dựa trên sự đồng ý rõ ràng.`,
        },
      },
    ],
  },
  {
    id: 7,
    title: '7. Contact Us',
    content: '/contact_us',
  },
];
