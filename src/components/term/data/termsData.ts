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
        content: `Welcome to Apollo NFT. These Terms of Service ("Terms") govern your access to and use of the Apollo NFT website, applications, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy.`,
      },
      {
        subtitle: '2. Account and Wallet',
        content: `To use most features of our Service, you must connect a supported third-party cryptocurrency wallet. Your account is associated with your wallet address. You are solely responsible for maintaining the security of your account and wallet, and you accept all risks of unauthorized access.`,
      },
      {
        subtitle: '3. Fees, Payments, and Transactions',
        content: `All transactions on the Apollo NFT platform are facilitated and run by smart contracts on the applicable blockchain. We may charge a service fee for transactions, which will be clearly displayed to you before you confirm the transaction. Creator royalties are also automatically deducted as per the smart contract.`,
      },
      {
        subtitle: '4. Intellectual Property Rights',
        content: `When you purchase an NFT on our platform, you own the underlying token. However, you do not own the creative work (the "Art") associated with the NFT unless explicitly granted by the creator. Each creator grants the NFT holder a license to the Art, the terms of which may vary.`,
      },
      {
        subtitle: '5. User Conduct',
        content: `You agree to use our Service only for lawful purposes and in accordance with these Terms. You may not use our Service to engage in any activity that is illegal, harmful, or interferes with or disrupts our Service or servers.`,
      },
      {
        subtitle: '6. Disclaimers',
        content: `Our Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee that our Service will be uninterrupted, secure, or error-free. You use our Service at your own risk.`,
      },
      {
        subtitle: '7. Limitation of Liability',
        content: `To the maximum extent permitted by law, Apollo NFT shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Service.`,
      },
      {
        subtitle: '8. Governing Law',
        content: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Apollo NFT operates, without regard to its conflict of law provisions.To use most features of our Service, you must connect a supported third-party cryptocurrency wallet.`,
      },
      {
        subtitle: '9. Contact Us',
        content: `If you have any questions about these Terms of Service, please contact us through our official support channels or community Discord server.`,
      },
    ],
  },
  {
    id: 2,
    title: '2. Account and Wallet',
    explan: `Mục tiêu chính: Làm rõ rằng "tài khoản" trên nền tảng chính là "ví điện tử" của người dùng, và mọi trách nhiệm bảo mật liên quan đến ví đó hoàn toàn thuộc về người dùng, không thuộc về nền tảng.
Nội dung của mục này nên được chia thành các tiểu mục nhỏ hơn để người dùng dễ đọc và dễ hiểu.`,
    data: [
      {
        subtitle: '2.1. Account Creation',
        content: {
          info: `Giải thích rằng để sử dụng các tính năng của Apollo NFT, người dùng phải kết nối một ví điện tử của bên thứ ba được hỗ trợ (ví dụ: MetaMask, Coinbase Wallet).
Nêu rõ rằng "tài khoản" của người dùng trên Apollo NFT được liên kết trực tiếp và định danh bởi địa chỉ ví công khai (public wallet address) của họ.
Nhấn mạnh rằng không có quy trình đăng ký bằng email/mật khẩu truyền thống. Việc kết nối ví đồng nghĩa với việc tạo một tài khoản.`,
          intent: `Giúp người dùng mới hiểu rõ cơ chế hoạt động của Web3, phân biệt rõ ràng với các nền tảng Web2 truyền thống.`,
        },
      },
      {
        subtitle: '2.2. Third-Party Wallets',
        content: {
          info: `Tuyên bố rõ ràng rằng Apollo NFT không sở hữu, kiểm soát hay chịu trách nhiệm về bất kỳ ví điện tử nào của bên thứ ba.
Nền tảng chỉ cung cấp một giao diện để tương tác an toàn, nhưng mọi giao dịch đều do người dùng tự ký và xác nhận thông qua nhà cung cấp ví của họ.
Miễn trừ trách nhiệm của Apollo NFT đối với bất kỳ lỗi, lỗ hổng bảo mật hay tổn thất nào phát sinh từ phần mềm ví của bên thứ ba.`,
          intent: `Vạch ra ranh giới trách nhiệm pháp lý rõ ràng. Nền tảng không chịu trách nhiệm về các vấn đề của MetaMask hay các ví khác.`,
        },
      },
      {
        subtitle:
          '2.3. Trách nhiệm Bảo mật của Bạn (Your Security Responsibilities)',
        content: {
          info: `Sử dụng ngôn ngữ mạnh mẽ, dứt khoát để khẳng định: Bạn là người duy nhất chịu trách nhiệm về việc bảo mật ví của mình.
Liệt kê rõ các trách nhiệm:
- Bảo vệ an toàn cho các thiết bị bạn dùng để truy cập ví.
- Giữ bí mật tuyệt đối khóa riêng tư (private keys) và cụm từ khôi phục (seed phrase) của bạn.
- Đưa ra cảnh báo rõ ràng: Apollo NFT sẽ không bao giờ yêu cầu bạn cung cấp khóa riêng tư hoặc cụm từ khôi phục dưới bất kỳ hình thức nào.
Tuyên bố rằng người dùng chấp nhận mọi rủi ro liên quan đến việc truy cập trái phép vào tài khoản của họ nếu họ không bảo mật tốt thông tin đăng nhập của mình.
Miễn trừ hoàn toàn trách nhiệm của Apollo NFT đối với bất kỳ tổn thất tài sản (NFT, tiền điện tử) nào do ví của người dùng bị xâm phạm.`,
          intent: `Giáo dục người dùng về các nguyên tắc bảo mật cơ bản trong Web3 và bảo vệ nền tảng khỏi các khiếu nại liên quan đến việc người dùng bị mất cắp tài sản do lỗi của chính họ.`,
        },
      },
      {
        subtitle: '2.4. Hoạt động Tài khoản (Account Activity)',
        content: {
          info: `Tuyên bố rằng người dùng chịu trách nhiệm hoàn toàn cho tất cả các hoạt động diễn ra trên nền tảng thông qua ví của họ.
Điều này bao gồm mọi giao dịch mua, bán, niêm yết hoặc các tương tác khác đã được ký và xác nhận bởi ví của họ.`,
          intent: `Khẳng định rằng một khi giao dịch đã được xác nhận từ ví, nó được coi là hành động hợp lệ của chính người dùng đó.`,
        },
      },
      {
        subtitle: '2.5. Tạm ngưng hoặc Chấm dứt (Suspension or Termination)',
        content: {
          info: `Nêu rõ quyền của Apollo NFT trong việc tạm ngưng hoặc cấm vĩnh viễn quyền truy cập vào dịch vụ đối với bất kỳ tài khoản nào vi phạm các Điều khoản Dịch vụ (ví dụ: thực hiện giao dịch rửa, tải lên nội dung bất hợp pháp, vi phạm bản quyền).`,
          intent: `Giúp người dùng mới hiểu rõ cơ chế hoạt động của Web3, phân biệt rõ ràng với các nền tảng Web2 truyền thống.`,
        },
      },
    ],
  },
  {
    id: 3,
    title: '3. Fees, Payments, and Transactions',
    explan: `(Phí, Thanh toán và Giao dịch).
Đây là một mục cực kỳ quan trọng, đòi hỏi sự minh bạch tuyệt đối để xây dựng lòng tin với người dùng và tránh các tranh chấp tài chính trong tương lai.
Phân tích Nội dung Mục "3. Fees, Payments, and Transactions"
Mục tiêu chính: Cung cấp một cái nhìn tổng quan, rõ ràng và đầy đủ về tất cả các loại chi phí mà người dùng có thể gặp phải khi giao dịch trên nền tảng, đồng thời giải thích bản chất của các giao dịch trên blockchain.
Nội dung của mục này nên được cấu trúc một cách logic để người dùng có thể phân biệt được các loại phí khác nhau.`,
    data: [
      {
        subtitle: '3.1. Phí Gas (Gas Fees)',
        content: {
          info: `Giải thích một cách đơn giản "Phí Gas" là gì: Đây là khoản phí trả cho mạng lưới blockchain (ví dụ: Ethereum) để thực hiện và xác thực một giao dịch.
Nhấn mạnh một cách rõ ràng rằng: Apollo NFT không nhận, kiểm soát hay có bất kỳ lợi ích nào từ Phí Gas.
Nêu rõ Phí Gas biến động liên tục dựa trên tình trạng tắc nghẽn của mạng lưới và Apollo NFT không thể dự đoán hay tác động đến mức phí này. Mọi khoản Phí Gas đều do người dùng thanh toán trực tiếp cho mạng lưới.`,
          intent: ` Giúp người dùng, đặc biệt là người mới, hiểu rằng Phí Gas là một phần không thể thiếu của blockchain và không phải là một khoản phí ẩn do nền tảng đặt ra. Điều này giúp tránh các khiếu nại về "phí giao dịch quá cao".`,
        },
      },
      {
        subtitle: '3.2. Phí Dịch vụ Nền tảng (Platform Service Fees)',
        content: {
          info: `Tuyên bố minh bạch rằng Apollo NFT sẽ thu một khoản phí dịch vụ cho các giao dịch thành công trên nền tảng. Đây là nguồn doanh thu để duy trì và phát triển sản phẩm.
Nêu rõ cách tính phí, thường là một tỷ lệ phần trăm (%) trên tổng giá bán của NFT.
Cam kết rằng tất cả các khoản phí dịch vụ sẽ được hiển thị rõ ràng cho người dùng xem xét trước khi họ ký và xác nhận bất kỳ giao dịch nào. Sẽ không có chi phí ẩn.
Bao gồm một điều khoản cho phép Apollo NFT có quyền thay đổi mức phí dịch vụ trong tương lai, nhưng phải thông báo trước cho người dùng.`,
          intent: `Xây dựng lòng tin thông qua sự minh bạch về mô hình kinh doanh của nền tảng.`,
        },
      },
      {
        subtitle: '3.3. Phí Bản quyền Tác giả (Creator Royalties)',
        content: {
          info: `Giải thích về cơ chế phí bản quyền: một tỷ lệ phần trăm của giá bán từ các giao dịch thứ cấp (khi một NFT được bán lại) sẽ tự động được chuyển cho nhà sáng tạo ban đầu.
Làm rõ rằng mức phí bản quyền này do nhà sáng tạo thiết lập khi họ tạo ra NFT, và được thực thi tự động bởi hợp đồng thông minh (smart contract).
Nêu rõ vai trò của Apollo NFT là tôn trọng và thực thi các khoản phí bản quyền này như một phần của giao dịch.`,
          intent: `Thể hiện sự ủng hộ của nền tảng đối với các nhà sáng tạo và giải thích cho người bán hiểu tại sao một phần số tiền họ nhận được lại được chuyển đi.`,
        },
      },
      {
        subtitle: '3.4. Bản chất của Giao dịch (Nature of Transactions)',
        content: {
          info: `Tuyên bố rằng tất cả các giao dịch trên Apollo NFT được thực hiện thông qua hợp đồng thông minh trên mạng lưới blockchain.
Nhấn mạnh các đặc tính quan trọng:
- Giao dịch trên blockchain là không thể thay đổi và không thể hoàn tác (irreversible and final).
- Apollo NFT không có khả năng đảo ngược, hủy bỏ hay hoàn tiền cho bất kỳ giao dịch nào một khi nó đã được xác thực trên blockchain.
Yêu cầu người dùng phải tự chịu trách nhiệm kiểm tra kỹ lưỡng mọi thông tin chi tiết (địa chỉ ví người nhận, số tiền, v.v.) trước khi xác nhận giao dịch.`,
          intent: `Quản lý kỳ vọng của người dùng và miễn trừ trách nhiệm pháp lý cho nền tảng đối với các sai sót do người dùng gây ra hoặc bản chất cố hữu của công nghệ blockchain.`,
        },
      },
      {
        subtitle: '3.5. Thuế (Taxes)',
        content: {
          info: `Một điều khoản pháp lý tiêu chuẩn nêu rõ rằng người dùng chịu trách nhiệm hoàn toàn trong việc xác định, kê khai và thanh toán tất cả các loại thuế (ví dụ: thuế bán hàng, thuế thu nhập, thuế thặng dư vốn) phát sinh từ các giao dịch của họ.
Tuyên bố rằng Apollo NFT không cung cấp tư vấn về thuế và không chịu trách nhiệm thu hoặc nộp thuế thay cho người dùng.`,
          intent: `Một điều khoản pháp lý quan trọng để bảo vệ nền tảng khỏi các trách nhiệm liên quan đến thuế của người dùng.`,
        },
      },
    ],
  },
  {
    id: 4,
    title: '4. Intellectual Property Rights',
    explan: `Mục tiêu chính: Làm rõ rằng tất cả quyền sở hữu trí tuệ (bao gồm nội dung, thiết kế, mã nguồn, hình ảnh, nhãn hiệu, và NFT) trên nền tảng đều thuộc về chủ sở hữu hợp pháp và Apollo NFT tôn trọng quyền này. 
Đồng thời, người dùng phải tuân thủ các quy định về bản quyền, nhãn hiệu và quyền sở hữu trí tuệ của người khác. Nội dung nên chia thành các tiểu mục nhỏ để người dùng dễ đọc và hiểu.`,
    data: [
      {
        subtitle: '4.1. Quyền của Nền tảng (Platform Intellectual Property)',
        content: {
          info: `Tuyên bố rằng tất cả nội dung, thiết kế, logo, mã nguồn, hình ảnh, đồ họa, và thương hiệu của Apollo NFT đều là tài sản trí tuệ của nền tảng hoặc được cấp phép hợp pháp.
Người dùng không được sao chép, tái sử dụng, phát hành, hoặc phân phối bất kỳ nội dung nào của nền tảng mà không có sự cho phép rõ ràng bằng văn bản.
Mục đích: Bảo vệ tài sản trí tuệ của nền tảng và ngăn chặn việc sử dụng trái phép.`,
          intent: `Bảo vệ tài sản trí tuệ của nền tảng và ngăn chặn việc sử dụng trái phép.`,
        },
      },
      {
        subtitle: '4.2. Quyền của Người Dùng (User-Generated Content)',
        content: {
          info: `Tuyên bố rằng tất cả NFT, hình ảnh, nội dung hoặc tài liệu mà người dùng tạo và tải lên nền tảng thuộc quyền sở hữu trí tuệ của chính người dùng đó, nếu không vi phạm pháp luật hoặc quyền của bên thứ ba.
Người dùng cấp cho Apollo NFT quyền được sử dụng, hiển thị, phân phối, và lưu trữ nội dung đó trên nền tảng và các phương tiện liên quan, với mục đích vận hành dịch vụ.
Mục đích: Làm rõ quyền sở hữu của người dùng đồng thời cho phép nền tảng vận hành dịch vụ..
Bao gồm một điều khoản cho phép Apollo NFT có quyền thay đổi mức phí dịch vụ trong tương lai, nhưng phải thông báo trước cho người dùng.`,
          intent: `Làm rõ quyền sở hữu của người dùng đồng thời cho phép nền tảng vận hành dịch vụ.`,
        },
      },
      {
        subtitle: '4.3. Tuân thủ Quyền Sở hữu Trí tuệ (Compliance with Intellectual Property Laws)',
        content: {
          info: `Người dùng phải đảm bảo rằng tất cả nội dung họ tải lên hoặc giao dịch không vi phạm bản quyền, nhãn hiệu, bằng sáng chế, hoặc bất kỳ quyền sở hữu trí tuệ nào của bên thứ ba.
Nền tảng có quyền loại bỏ nội dung vi phạm và tạm ngưng hoặc chấm dứt tài khoản của người dùng nếu phát hiện vi phạm.
Cảnh báo rõ ràng: Người dùng chịu trách nhiệm pháp lý về mọi hành vi xâm phạm quyền sở hữu trí tuệ của người khác.`,
          intent: `Bảo vệ nền tảng khỏi trách nhiệm pháp lý và giáo dục người dùng về luật sở hữu trí tuệ.`,
        },
      },
      {
        subtitle: '4.4. Miễn trừ Trách nhiệm (Disclaimer of Liability)',
        content: {
          info: `Apollo NFT không chịu trách nhiệm cho bất kỳ khiếu nại, tranh chấp, hoặc tổn thất nào phát sinh từ việc người dùng tải lên hoặc giao dịch nội dung vi phạm quyền sở hữu trí tuệ.
Người dùng đồng ý bồi thường cho nền tảng trong trường hợp có bất kỳ hành vi vi phạm nào dẫn đến yêu cầu pháp lý từ bên thứ ba.`,
          intent: `Làm rõ ranh giới trách nhiệm và bảo vệ nền tảng.`,
        },
      },
      {
        subtitle: '4.5. Báo cáo Vi phạm (Reporting Infringements)',
        content: {
          info: `Cung cấp hướng dẫn để người dùng hoặc chủ sở hữu hợp pháp gửi thông báo vi phạm quyền sở hữu trí tuệ đến nền tảng.
Nền tảng sẽ xem xét và gỡ bỏ nội dung vi phạm theo quy trình hợp pháp.`,
          intent: `Tạo cơ chế giải quyết tranh chấp, bảo vệ quyền sở hữu trí tuệ một cách minh bạch.`,
        },
      },
    ],
  },
  {
    id: 5,
    title: '5. User Conduct',
    explan: `Mục tiêu chính: Làm rõ các hành vi được phép và không được phép khi sử dụng nền tảng, đảm bảo môi trường an toàn, tôn trọng luật pháp, và bảo vệ trải nghiệm của tất cả người dùng. 
    Nội dung chia thành các tiểu mục để dễ hiểu và dễ áp dụng.`,
    data: [
      {
        subtitle: '5.1. Hành vi Được phép (Permitted Activities)',
        content: {
          info: `Người dùng có quyền tạo, mua, bán, hoặc giao dịch NFT hợp pháp trên nền tảng.
Người dùng có thể tương tác với các tính năng của nền tảng theo đúng quy định và hướng dẫn của Apollo NFT.
Khuyến khích người dùng tham gia cộng đồng một cách tích cực, tôn trọng quyền lợi của người khác.`,
          intent: `Giúp người dùng hiểu rõ các hành vi được khuyến khích và hợp pháp trên nền tảng.`,
        },
      },
      {
        subtitle: '5.2. Hành vi Bị cấm (Prohibited Activities)',
        content: {
          info: `Cấm bất kỳ hành vi gian lận, lừa đảo, rửa tiền, hoặc thao túng thị trường NFT.
Cấm tải lên, chia sẻ, hoặc giao dịch nội dung bất hợp pháp, vi phạm bản quyền, nhãn hiệu, hoặc quyền sở hữu trí tuệ của người khác.
Cấm quấy rối, đe dọa, hoặc xúc phạm người dùng khác.
Cấm sử dụng nền tảng để phát tán virus, malware, hoặc các phần mềm độc hại.`,
          intent: `Bảo vệ người dùng và nền tảng khỏi các hành vi gây hại, phi pháp, hoặc làm gián đoạn trải nghiệm dịch vụ.`,
        },
      },
      {
        subtitle: '5.3. Trách nhiệm của Người dùng (User Responsibilities)',
        content: {
          info: `Người dùng phải đảm bảo thông tin đăng ký và giao dịch là chính xác và hợp pháp.
Người dùng chịu trách nhiệm về các hành vi của mình trên nền tảng, bao gồm cả việc sử dụng ví điện tử và ký giao dịch.
Người dùng phải tuân thủ tất cả các luật và quy định áp dụng liên quan đến giao dịch NFT và tài sản số.`,
          intent: `Làm rõ rằng người dùng phải tự chịu trách nhiệm về mọi hành vi của mình và đảm bảo tuân thủ pháp luật.`,
        },
      },
      {
        subtitle: '5.4. Hậu quả của Vi phạm (Consequences of Violations)',
        content: {
          info: `Apollo NFT có quyền tạm ngưng hoặc chấm dứt tài khoản vi phạm các quy định về hành vi người dùng.
Nền tảng có thể gỡ bỏ nội dung vi phạm và thông báo tới cơ quan pháp luật nếu cần thiết.
Người dùng vi phạm có thể phải chịu trách nhiệm pháp lý và bồi thường cho bất kỳ tổn thất nào gây ra cho nền tảng hoặc người khác.`,
          intent: `Đảm bảo tính nghiêm minh và răn đe để duy trì môi trường hoạt động lành mạnh, công bằng.`,
        },
      },
    ],
  },
  {
    id: 6,
    title: '6. Disclaimers',
    explan: `Mục tiêu chính: Làm rõ rằng Apollo NFT không chịu trách nhiệm về các rủi ro, tổn thất, hoặc hậu quả phát sinh khi người dùng sử dụng nền tảng, giúp bảo vệ pháp lý cho nền tảng và đồng thời giáo dục người dùng về rủi ro liên quan. 
    Nội dung được chia thành các tiểu mục nhỏ để dễ đọc và hiểu.`,
    data: [
      {
        subtitle: '6.1. Rủi ro chung khi sử dụng nền tảng (General Use Risks)',
        content: {
          info: `Sử dụng Apollo NFT hoàn toàn là trách nhiệm của người dùng.
Nền tảng được cung cấp “nguyên trạng” (as-is), không đảm bảo rằng dịch vụ sẽ không bị gián đoạn, không lỗi, hoặc hoàn toàn an toàn.
Người dùng chấp nhận tất cả rủi ro liên quan đến việc sử dụng nền tảng, bao gồm việc mất NFT, tiền điện tử, hoặc dữ liệu cá nhân.`,
          intent: `Giáo dục người dùng về rủi ro cơ bản khi tương tác với nền tảng Web3 và NFT.`,
        },
      },
      {
        subtitle: '6.2. Miễn trừ trách nhiệm về nội dung và thông tin (Content and Information Disclaimer)',
        content: {
          info: `Apollo NFT không chịu trách nhiệm về tính chính xác, đầy đủ, hoặc hợp pháp của nội dung do người dùng tải lên.
Nền tảng không kiểm soát và không chịu trách nhiệm về các liên kết, trang web bên ngoài hoặc nội dung do bên thứ ba cung cấp.`,
          intent: `Làm rõ ranh giới trách nhiệm liên quan đến nội dung và thông tin, bảo vệ nền tảng khỏi các khiếu nại.`,
        },
      },
      {
        subtitle: '6.3. Miễn trừ trách nhiệm về giao dịch (Transaction Disclaimer)',
        content: {
          info: `Tất cả giao dịch mua, bán, hoặc chuyển nhượng NFT đều do người dùng ký và xác nhận bằng ví của họ.
Apollo NFT không chịu trách nhiệm cho bất kỳ mất mát, lỗi kỹ thuật, hoặc giao dịch trái phép nào liên quan đến ví hoặc tài sản của người dùng.`,
          intent: `Khẳng định người dùng chịu trách nhiệm về mọi giao dịch, bảo vệ nền tảng khỏi khiếu nại liên quan đến mất mát tài sản.`,
        },
      },
      {
        subtitle: '6.4. Miễn trừ trách nhiệm pháp lý khác (Other Legal Disclaimers)',
        content: {
          info: `Nền tảng không chịu trách nhiệm về bất kỳ tổn thất gián tiếp, ngẫu nhiên, hay phát sinh nào từ việc sử dụng dịch vụ.
Người dùng đồng ý bồi thường cho Apollo NFT nếu bất kỳ khiếu nại pháp lý nào phát sinh do hành vi của họ.`,
          intent: `Bảo vệ nền tảng khỏi rủi ro pháp lý và đảm bảo người dùng hiểu rõ các giới hạn trách nhiệm.`,
        },
      },
    ],
  },
  {
    id: 7,
    title: '7. Limitation of Liability',
    explan: `Mục tiêu chính: Làm rõ rằng Apollo NFT không chịu trách nhiệm đối với các tổn thất, thiệt hại, hay hậu quả phát sinh khi người dùng sử dụng nền tảng, nhằm bảo vệ pháp lý cho nền tảng và giúp người dùng hiểu rõ giới hạn trách nhiệm của nền tảng. 
    Nội dung được chia thành các tiểu mục nhỏ để dễ đọc và hiểu.`,
    data: [
      {
        subtitle: '7.1. Giới hạn trách nhiệm tổng quát (General Liability Limitations)',
        content: {
          info: `Apollo NFT không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, hay phát sinh nào do việc sử dụng hoặc không thể sử dụng dịch vụ.
Điều này bao gồm nhưng không giới hạn ở mất NFT, tiền điện tử, dữ liệu, lợi nhuận, hoặc cơ hội kinh doanh.`,
          intent: `Làm rõ rằng người dùng chịu trách nhiệm về rủi ro khi sử dụng nền tảng.`,
        },
      },
      {
        subtitle: '7.2. Giới hạn trách nhiệm về giao dịch và ví (Transactions and Wallets)',
        content: {
          info: `Mọi giao dịch trên nền tảng được thực hiện thông qua ví điện tử của người dùng và hoàn toàn do người dùng ký và xác nhận.
Apollo NFT không chịu trách nhiệm cho bất kỳ lỗi, mất mát hoặc truy cập trái phép nào liên quan đến ví hoặc tài sản số của người dùng.`,
          intent: `Khẳng định rằng người dùng chịu trách nhiệm về tất cả giao dịch và bảo mật ví.`,
        },
      },
      {
        subtitle: '7.3. Giới hạn trách nhiệm về nội dung (Content Liability Limitations)',
        content: {
          info: `Apollo NFT không chịu trách nhiệm về tính hợp pháp, chính xác, hoặc đầy đủ của nội dung do người dùng tải lên hoặc chia sẻ.
Nền tảng cũng không chịu trách nhiệm về nội dung từ bên thứ ba hoặc các liên kết ngoài nền tảng.`,
          intent: `Bảo vệ nền tảng khỏi các khiếu nại liên quan đến nội dung do người dùng hoặc bên thứ ba cung cấp.`,
        },
      },
      {
        subtitle: '7.4. Giới hạn pháp lý khác (Other Legal Limitations)',
        content: {
          info: `Trong phạm vi pháp luật cho phép, trách nhiệm tổng cộng của Apollo NFT đối với bất kỳ khiếu nại nào sẽ không vượt quá giá trị mà người dùng đã trả cho nền tảng (nếu có).
Người dùng đồng ý bồi thường và bảo vệ Apollo NFT khỏi mọi khiếu nại hoặc thiệt hại phát sinh từ hành vi vi phạm của họ.`,
          intent: `Hạn chế tối đa rủi ro pháp lý và bảo vệ nền tảng trong mọi tình huống.`,
        },
      },
    ],
  },
    {
    id: 8,
    title: '8. Governing Law',
    explan: `Mục tiêu chính: Làm rõ luật pháp nào sẽ điều chỉnh việc sử dụng nền tảng, giải quyết tranh chấp và áp dụng cho các quyền và nghĩa vụ của người dùng cũng như Apollo NFT. 
    Nội dung được chia thành các tiểu mục nhỏ để người dùng dễ đọc và hiểu.`,
    data: [
      {
        subtitle: '8.1. Luật điều chỉnh (Applicable Law)',
        content: {
          info: `Việc sử dụng Apollo NFT và tất cả các tranh chấp phát sinh liên quan đến nền tảng sẽ được điều chỉnh bởi luật pháp của quốc gia nơi nền tảng được thành lập (ví dụ: Luật Việt Nam, hoặc quốc gia mà Apollo NFT đăng ký hoạt động).
Không áp dụng xung đột pháp luật hoặc luật của bất kỳ quốc gia nào khác trừ khi có thỏa thuận riêng bằng văn bản.`,
          intent: `Xác định rõ ràng cơ sở pháp lý áp dụng cho mọi hoạt động trên nền tảng.`,
        },
      },
      {
        subtitle: '8.2. Giải quyết tranh chấp (Dispute Resolution)',
        content: {
          info: `Người dùng và Apollo NFT đồng ý rằng mọi tranh chấp liên quan đến TOS, tài khoản, giao dịch, hoặc nội dung sẽ được giải quyết ưu tiên thông qua thương lượng hòa giải.
Nếu hòa giải thất bại, tranh chấp sẽ được đưa ra tòa án có thẩm quyền tại quốc gia nơi Apollo NFT đặt trụ sở.`,
          intent: `Cung cấp cơ chế pháp lý rõ ràng để giải quyết tranh chấp, bảo vệ quyền lợi của cả hai bên.`,
        },
      },
      {
        subtitle: '8.3. Thẩm quyền (Jurisdiction)',
        content: {
          info: `Người dùng đồng ý rằng các tòa án tại quốc gia mà Apollo NFT đăng ký sẽ có thẩm quyền duy nhất để xét xử mọi tranh chấp pháp lý.
Người dùng từ bỏ quyền đưa vụ việc ra tòa án tại quốc gia khác, trừ khi có thỏa thuận riêng.`,
          intent: `Đảm bảo tính nhất quán và dễ dàng thực thi pháp lý đối với mọi tranh chấp..`,
        },
      },
    ],
  },
  {
    id: 9,
    title: '9. Contact Us',
    content: '/contact_us',
  },
];
